export interface IStorageProvider {
  ensureDirectories(): Promise<void>;
  saveFile(category: string, filename: string, buffer: Buffer | Uint8Array): Promise<string>;
  saveTempFile(subCategory: "tempAssets" | "tempRenders" | "tempVoice" | "tempSubtitles", buffer: Buffer | Uint8Array, extension: string): Promise<string>;
  readFile(filePath: string): Promise<Buffer>;
  deleteFile(filePath: string): Promise<void>;
  getDirectory(category: string): string;
  cleanupTempStorage(maxAgeMs?: number): Promise<void>;
  createReadStream(path: string): NodeJS.ReadableStream;
  getFileSize(path: string): Promise<number>;
  createDir(path: string): Promise<void>;
  exists(path: string): Promise<boolean>;
}
