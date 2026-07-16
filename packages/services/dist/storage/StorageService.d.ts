import { LocalStorageProvider } from "@thronova/providers";
export interface FileStat {
    path: string;
    filename: string;
    sizeBytes: number;
    ageMs: number;
    category: string;
}
export declare class StorageService {
    private localProvider;
    constructor();
    getProvider(): LocalStorageProvider;
    getDiskUsage(): Promise<{
        totalBytes: number;
        usedBytes: number;
        freeBytes: number;
    }>;
    getLargestFiles(limit?: number): Promise<FileStat[]>;
    getOldestFiles(limit?: number): Promise<FileStat[]>;
    executeCleanupCycle(workerNodeName: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        details: import("@prisma/client/runtime/client").JsonValue | null;
        workerNode: string;
        durationMs: number;
        filesDeleted: number;
        bytesFreed: bigint;
        errors: number;
    }>;
    private scanTempDirectories;
    private scanAllDirectories;
    private scanDirectory;
}
export declare const storageService: StorageService;
