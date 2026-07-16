"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderService = exports.RenderService = void 0;
const JobService_1 = require("../workflow/JobService");
const path_1 = __importDefault(require("path"));
const StorageService_1 = require("../storage/StorageService");
const config_1 = require("@thronova/config");
class RenderService {
    runner = null;
    registerRunner(runner) {
        this.runner = runner;
    }
    async startRender(projectId, storyboard) {
        // 1. Create a job
        const job = await JobService_1.jobService.createJob('RENDER', projectId, { storyboardTitle: storyboard.title });
        await JobService_1.jobService.updateJobStatus(job.id, 'RUNNING', 10);
        try {
            // 2. Resolve Paths
            const compositionId = "MainVideo";
            const entryPoint = path_1.default.resolve(process.cwd(), "src/remotion/index.ts");
            if (!this.runner) {
                throw new Error("No Remotion runner registered. Make sure this is running in the Render Worker.");
            }
            const outputDir = path_1.default.resolve(process.cwd(), config_1.EnvConfig.STORAGE_ROOT || "public/renders");
            if (!(await StorageService_1.storageService.getProvider().exists(outputDir))) {
                await StorageService_1.storageService.getProvider().createDir(outputDir);
            }
            const { videoPath, thumbPath } = await this.runner.bundleAndRender({
                entryPoint,
                compositionId,
                outputDir,
                jobId: job.id,
                storyboard,
                onProgress: async (progress) => {
                    const currentProgress = Math.floor(10 + (progress * 85));
                    await JobService_1.jobService.updateJobStatus(job.id, 'RUNNING', currentProgress);
                }
            });
            // 7. Save Stats & Complete
            console.log(`[RenderService] Render Complete: ${videoPath}`);
            await JobService_1.jobService.updateJobStatus(job.id, 'COMPLETED', 100);
            return {
                jobId: job.id,
                videoUrl: `/renders/\${job.id}.mp4`,
                thumbnailUrl: `/renders/\${job.id}_thumb.jpeg`
            };
        }
        catch (error) {
            console.error(`[RenderService] Render Failed:`, error);
            await JobService_1.jobService.updateJobStatus(job.id, 'FAILED', 100);
            throw error;
        }
    }
}
exports.RenderService = RenderService;
exports.renderService = new RenderService();
