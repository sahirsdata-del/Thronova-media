"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractStorageService = void 0;
class AbstractStorageService {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    async saveFile(path, data) { return this.provider.save(path, data); }
    async getFile(path) { return this.provider.read(path); }
    async deleteFile(path) { return this.provider.delete(path); }
    async moveFile(source, dest) { return this.provider.move(source, dest); }
    async listFiles(prefix) { return this.provider.list(prefix); }
    async exists(path) { return this.provider.exists(path); }
    createReadStream(path) { return this.provider.createReadStream(path); }
    async getFileSize(path) { return this.provider.getFileSize(path); }
    async createDir(path) { return this.provider.createDir(path); }
}
exports.AbstractStorageService = AbstractStorageService;
