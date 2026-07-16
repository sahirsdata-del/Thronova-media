"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageService = exports.StorageService = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const providers_1 = require("@thronova/providers");
const RetentionPolicyService_1 = require("./RetentionPolicyService");
const database_1 = require("@thronova/database");
class StorageService {
    localProvider;
    constructor() {
        this.localProvider = new providers_1.LocalStorageProvider();
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
        }
        catch (e) {
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
    async getLargestFiles(limit = 10) {
        const files = await this.scanAllDirectories();
        return files.sort((a, b) => b.sizeBytes - a.sizeBytes).slice(0, limit);
    }
    async getOldestFiles(limit = 10) {
        const files = await this.scanAllDirectories();
        return files.sort((a, b) => b.ageMs - a.ageMs).slice(0, limit);
    }
    async executeCleanupCycle(workerNodeName) {
        console.log(`[StorageService] Starting cleanup cycle from ${workerNodeName}...`);
        const startTime = Date.now();
        let filesDeleted = 0;
        let bytesFreed = BigInt(0);
        let errors = 0;
        const files = await this.scanTempDirectories();
        for (const file of files) {
            try {
                const canDelete = await RetentionPolicyService_1.retentionPolicyService.canDeleteFile(file.category, file.path, file.ageMs);
                if (canDelete) {
                    await this.localProvider.deleteFile(file.path);
                    filesDeleted++;
                    bytesFreed += BigInt(file.sizeBytes);
                }
            }
            catch (err) {
                console.error(`[StorageService] Error processing file ${file.path}:`, err);
                errors++;
            }
        }
        const durationMs = Date.now() - startTime;
        // Log the cleanup to DB
        const log = await database_1.prisma.cleanupLog.create({
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
        await database_1.prisma.storageSnapshot.create({
            data: {
                totalBytes: BigInt(usage.totalBytes),
                usedBytes: BigInt(usage.usedBytes),
                freeBytes: BigInt(usage.freeBytes)
            }
        });
        console.log(`[StorageService] Cleanup complete. Freed ${bytesFreed} bytes.`);
        return log;
    }
    async scanTempDirectories() {
        const categories = ["tempAssets", "tempRenders", "tempVoice", "tempSubtitles"];
        let allFiles = [];
        for (const category of categories) {
            const dir = this.localProvider.getDirectory(category);
            if (dir) {
                const files = await this.scanDirectory(dir, category);
                allFiles = allFiles.concat(files);
            }
        }
        return allFiles;
    }
    async scanAllDirectories() {
        // Just a wrapper to scan all categories defined in LocalStorageProvider
        const categories = [
            "temp", "tempAssets", "tempRenders", "tempVoice", "tempSubtitles",
            "persistent", "thumbnails", "exports", "brandAssets", "cache", "uploads", "archive"
        ];
        let allFiles = [];
        for (const category of categories) {
            const dir = this.localProvider.getDirectory(category);
            if (dir) {
                const files = await this.scanDirectory(dir, category);
                allFiles = allFiles.concat(files);
            }
        }
        return allFiles;
    }
    async scanDirectory(dirPath, category) {
        const fileStats = [];
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
                    }
                    catch (e) {
                        // File might have been deleted concurrently
                    }
                }
            }
        }
        catch (error) {
            if (error.code !== "ENOENT") {
                console.error(`Error scanning directory ${dirPath}:`, error);
            }
        }
        return fileStats;
    }
}
exports.StorageService = StorageService;
exports.storageService = new StorageService();
