"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetService = exports.AssetService = void 0;
const providers_1 = require("@thronova/providers");
const JobService_1 = require("../workflow/JobService");
const providers_2 = require("@thronova/providers");
class AssetService {
    // Mock DB Cache
    assetCache = {};
    async downloadSceneAssets(projectId, sceneId, requirements) {
        const job = await JobService_1.jobService.createJob('ASSET_DOWNLOAD', projectId, { sceneId });
        await JobService_1.jobService.updateJobStatus(job.id, 'RUNNING', 10);
        const downloadedAssets = [];
        try {
            for (let i = 0; i < requirements.length; i++) {
                const req = requirements[i];
                const cacheKey = `\${req.type}-\${req.description}`;
                // Check cache (Mocking DB lookup)
                if (this.assetCache[cacheKey]) {
                    downloadedAssets.push(this.assetCache[cacheKey]);
                    continue;
                }
                const provider = providers_1.assetEngine.getProviderForType(req.type, req.description);
                const result = await provider.searchAndDownload(req.description, req.type);
                // Download the actual file to local storage
                let localPath = result.fileUrl;
                if (result.fileUrl.startsWith('http')) {
                    try {
                        const response = await fetch(result.fileUrl);
                        const buffer = Buffer.from(await response.arrayBuffer());
                        const extension = result.type === 'VIDEO' ? 'mp4' : 'jpg';
                        localPath = await providers_2.storageProvider.saveTempFile('tempAssets', buffer, extension);
                    }
                    catch (e) {
                        console.error(`Failed to download asset from ${result.fileUrl}`, e);
                    }
                }
                const newAsset = {
                    id: result.sourceId,
                    title: req.description,
                    type: result.type,
                    url: localPath, // Store the local path instead of external URL
                    thumbnailUrl: result.thumbnailUrl,
                    tags: [result.providerName, "Auto-Downloaded"],
                };
                this.assetCache[cacheKey] = newAsset;
                downloadedAssets.push(newAsset);
                // Progress update
                await JobService_1.jobService.updateJobStatus(job.id, 'RUNNING', 10 + Math.floor(((i + 1) / requirements.length) * 80));
            }
            await JobService_1.jobService.updateJobStatus(job.id, 'COMPLETED', 100);
            return downloadedAssets;
        }
        catch (error) {
            console.error("[AssetService] Error downloading assets:", error);
            await JobService_1.jobService.updateJobStatus(job.id, 'FAILED', 100);
            throw error;
        }
    }
    async getAssets() {
        return Object.values(this.assetCache).length > 0
            ? Object.values(this.assetCache)
            : [
                { id: "1", title: "Poco X6 Neo Front", type: "IMAGE", url: "/assets/phone1.png", tags: ["Phone", "Poco", "Front"], resolution: "1080x1920", sizeBytes: 1500000 },
                { id: "2", title: "Tech Background", type: "VIDEO", url: "/assets/bg1.mp4", tags: ["Background", "Tech", "Dark"], resolution: "1920x1080", sizeBytes: 45000000 },
                { id: "3", title: "Camera Icon", type: "SVG", url: "/assets/camera.svg", tags: ["Icon", "Camera"], sizeBytes: 20000 },
            ];
    }
    async getFolders() {
        return [
            { id: "f1", name: "Phones" },
            { id: "f2", name: "Icons" },
            { id: "f3", name: "Backgrounds" },
        ];
    }
}
exports.AssetService = AssetService;
exports.assetService = new AssetService();
