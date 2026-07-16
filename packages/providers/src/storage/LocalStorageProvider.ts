import { EnvConfig } from "@thronova/config";
import * as fs from "fs/promises";
import * as path from "path";
import { randomUUID } from "crypto";
import { IStorageProvider } from "./IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {
  private readonly storageRoot: string;
  private readonly directories: Record<string, string>;

  constructor() {
    this.storageRoot = EnvConfig.STORAGE_ROOT || "/opt/thronova-media/storage";
    
    this.directories = {
      temp: path.join(this.storageRoot, "temp"),
      tempAssets: path.join(this.storageRoot, "temp", "assets"),
      tempRenders: path.join(this.storageRoot, "temp", "renders"),
      tempVoice: path.join(this.storageRoot, "temp", "voice"),
      tempSubtitles: path.join(this.storageRoot, "temp", "subtitles"),
      persistent: path.join(this.storageRoot, "persistent"),
      thumbnails: path.join(this.storageRoot, "persistent", "thumbnails"),
      exports: path.join(this.storageRoot, "persistent", "exports"),
      brandAssets: path.join(this.storageRoot, "persistent", "brand-assets"),
      cache: path.join(this.storageRoot, "cache"),
      uploads: path.join(this.storageRoot, "uploads"),
      archive: path.join(this.storageRoot, "archive")
    };
  }

  /**
   * Ensure all required directories exist.
   * Call this on service initialization.
   */
  async ensureDirectories(): Promise<void> {
    for (const dir of Object.values(this.directories)) {
      await fs.mkdir(dir, { recursive: true });
    }
  }

  /**
   * Save a file to a specific storage area.
   */
  async saveFile(category: keyof typeof this.directories, filename: string, buffer: Buffer | Uint8Array): Promise<string> {
    const dir = this.directories[category];
    if (!dir) throw new Error(`Invalid storage category: ${category}`);
    
    const filePath = path.join(dir, filename);
    await fs.writeFile(filePath, buffer);
    return filePath;
  }

  /**
   * Save a temporary file and return the path.
   * Generates a UUID filename if none provided.
   */
  async saveTempFile(subCategory: "tempAssets" | "tempRenders" | "tempVoice" | "tempSubtitles", buffer: Buffer | Uint8Array, extension: string): Promise<string> {
    const filename = `${randomUUID()}.${extension}`;
    return this.saveFile(subCategory, filename, buffer);
  }

  /**
   * Read a file from a specific storage area.
   */
  async readFile(filePath: string): Promise<Buffer> {
    return fs.readFile(filePath);
  }

  /**
   * Delete a file.
   */
  async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        console.error(`Failed to delete file ${filePath}:`, error);
      }
    }
  }

  /**
   * Get the absolute path for a directory category.
   */
  getDirectory(category: keyof typeof this.directories): string {
    return this.directories[category];
  }

  /**
   * Clear all files in a temporary directory older than `maxAgeMs`.
   * Essential for the file lifecycle cleanup.
   */
  async cleanupTempStorage(maxAgeMs: number = 24 * 60 * 60 * 1000): Promise<void> {
    const tempDirs = [
      this.directories.tempAssets,
      this.directories.tempRenders,
      this.directories.tempVoice,
      this.directories.tempSubtitles
    ];

    const now = Date.now();

    for (const dir of tempDirs) {
      try {
        const files = await fs.readdir(dir);
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stats = await fs.stat(filePath);
          if (now - stats.mtimeMs > maxAgeMs) {
            await this.deleteFile(filePath);
          }
        }
      } catch (error) {
        console.error(`Failed to clean up directory ${dir}:`, error);
      }
    }
  }

  createReadStream(path: string) {
    return require('fs').createReadStream(path);
  }

  async getFileSize(path: string): Promise<number> {
    const stats = await fs.stat(path);
    return stats.size;
  }

  async createDir(path: string): Promise<void> {
    await fs.mkdir(path, { recursive: true });
  }

  async exists(path: string): Promise<boolean> {
    try {
      await fs.stat(path);
      return true;
    } catch {
      return false;
    }
  }
}

export const storageProvider = new LocalStorageProvider();
