"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionService = exports.VersionService = void 0;
class VersionService {
    async saveVersion(ideaId, rawJson, summary, confidenceScore) {
        // Mock save logic
        return {
            id: `ver-${Date.now()}`,
            ideaId,
            versionNumber: 1, // Logic would calculate max + 1
            summary,
            rawJson,
            confidenceScore,
            lastUpdated: new Date()
        };
    }
    async getVersions(ideaId) {
        // Mock return
        return [];
    }
    async getVersion(versionId) {
        return null;
    }
}
exports.VersionService = VersionService;
exports.versionService = new VersionService();
