import { IStorageProvider } from "@thronova/providers";
export declare class AbstractStorageService {
    private provider;
    constructor(provider: IStorageProvider);
    saveFile(path: string, data: Buffer): Promise<any>;
    getFile(path: string): Promise<any>;
    deleteFile(path: string): Promise<any>;
    moveFile(source: string, dest: string): Promise<any>;
    listFiles(prefix: string): Promise<any>;
    exists(path: string): Promise<boolean>;
    createReadStream(path: string): NodeJS.ReadableStream;
    getFileSize(path: string): Promise<number>;
    createDir(path: string): Promise<void>;
}
