import * as fs from "fs/promises";
import * as path from "path";
import { LocalStorageProvider } from "@thronova/providers";
import { retentionPolicyService } from "./RetentionPolicyService";
import { prisma } from "@thronova/database";

export interface FileStat {
  path: string;
  filename: string;
  sizeBytes: number;
  ageMs: number;
  category: string;
}

export class StorageService {
  private localProvider: LocalStorageProvider;

  constructor() {
    this.localProvider = new LocalStorageProvider();
  }

  getProvider() {
    return this.localProvider;
  }

  async getDiskUsage() {
    let totalBytes = 0;
    let usedBytes = 0;

    // We can only check what's inside our managed directories on this volume
    // Or we could use node 'fs' statfs if on Node 18+
    try {
      const stats = await fs.statfs(this.localProvider.getDirectory("temp"));
      totalBytes = stats.bsize * stats.blocks;
      const freeBytes = stats.bsize * stats.bfree;
      usedBytes = totalBytes - freeBytes;
    } catch (e) {
      // Fallback if statfs is unavailable
      const files = await this.scanAllDirectories();
      usedBytes = files.reduce((acc, f) => acc + f.sizeBytes, 0);
      totalBytes = 50 * 1024 * 1024 * 1024; // Dummy 50GB fallback
    }

    return {
      totalBytes,
      usedBytes,
      freeBytes: totalBytes - usedBytes
    };
  }

  async getLargestFiles(limit: number = 10): Promise<FileStat[]> {
    const files = await this.scanAllDirectories();
    return files.sort((a, b) => b.sizeBytes - a.sizeBytes).slice(0, limit);
  }

  async getOldestFiles(limit: number = 10): Promise<FileStat[]> {
    const files = await this.scanAllDirectories();
    return files.sort((a, b) => b.ageMs - a.ageMs).slice(0, limit);
  }

  async executeCleanupCycle(workerNodeName: string) {
    console.log(`[StorageService] Starting cleanup cycle from ${workerNodeName}...`);
    
    const startTime = Date.now();
    let filesDeleted = 0;
    let bytesFreed = BigInt(0);
    let errors = 0;
    
    const files = await this.scanTempDirectories();

    for (const file of files) {
      try {
        const canDelete = await retentionPolicyService.canDeleteFile(
          file.category, 
          file.path, 
          file.ageMs
        );

        if (canDelete) {
          await this.localProvider.deleteFile(file.path);
          filesDeleted++;
          bytesFreed += BigInt(file.sizeBytes);
        }
      } catch (err) {
        console.error(`[StorageService] Error processing file ${file.path}:`, err);
        errors++;
      }
    }

    const durationMs = Date.now() - startTime;

    // Log the cleanup to DB
    const log = await prisma.cleanupLog.create({
      data: {
        workerNode: workerNodeName,
        filesDeleted,
        bytesFreed,
        errors,
        durationMs,
        status: "COMPLETED"
      }
    });

    // Also take a snapshot of disk usage
    const usage = await this.getDiskUsage();
    await prisma.storageSnapshot.create({
      data: {
        totalBytes: BigInt(usage.totalBytes),
        usedBytes: BigInt(usage.usedBytes),
        freeBytes: BigInt(usage.freeBytes)
      }
    });

    console.log(`[StorageService] Cleanup complete. Freed ${bytesFreed} bytes.`);
    return log;
  }

  private async scanTempDirectories(): Promise<FileStat[]> {
    const categories = ["tempAssets", "tempRenders", "tempVoice", "tempSubtitles"];
    let allFiles: FileStat[] = [];
    
    for (const category of categories) {
      const dir = this.localProvider.getDirectory(category as any);
      if (dir) {
        const files = await this.scanDirectory(dir, category);
        allFiles = allFiles.concat(files);
      }
    }
    
    return allFiles;
  }

  private async scanAllDirectories(): Promise<FileStat[]> {
    // Just a wrapper to scan all categories defined in LocalStorageProvider
    const categories = [
      "temp", "tempAssets", "tempRenders", "tempVoice", "tempSubtitles",
      "persistent", "thumbnails", "exports", "brandAssets", "cache", "uploads", "archive"
    ];
    let allFiles: FileStat[] = [];
    
    for (const category of categories) {
      const dir = this.localProvider.getDirectory(category as any);
      if (dir) {
        const files = await this.scanDirectory(dir, category);
        allFiles = allFiles.concat(files);
      }
    }
    
    return allFiles;
  }

  private async scanDirectory(dirPath: string, category: string): Promise<FileStat[]> {
    const fileStats: FileStat[] = [];
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile()) {
          const fullPath = path.join(dirPath, entry.name);
          try {
            const stats = await fs.stat(fullPath);
            fileStats.push({
              path: fullPath,
              filename: entry.name,
              sizeBytes: stats.size,
              ageMs: Date.now() - stats.mtimeMs,
              category
            });
          } catch (e) {
            // File might have been deleted concurrently
          }
        }
      }
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        console.error(`Error scanning directory ${dirPath}:`, error);
      }
    }
    return fileStats;
  }
}

export const storageService = new StorageService();
