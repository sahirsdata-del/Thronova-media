"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishService = exports.PublishService = void 0;
const JobService_1 = require("../workflow/JobService");
const shared_1 = require("@thronova/shared");
const constants_1 = require("@thronova/constants");
const database_1 = require("@thronova/database");
class PublishService {
    providers = {};
    registerProvider(platform, provider) {
        this.providers[platform] = provider;
    }
    // Public method to schedule/enqueue an upload
    async scheduleUpload(projectId, filePath, metadata, scheduledTime) {
        const platform = metadata.targetPlatform || "YOUTUBE";
        // Calculate delay for BullMQ if scheduled in the future
        let delay = 0;
        if (scheduledTime) {
            delay = scheduledTime.getTime() - Date.now();
            if (delay < 0)
                delay = 0;
        }
        // Add to BullMQ Queue using the QueueService
        console.log(`[PublishService] Enqueuing \${platform} upload. Delay: \${delay}ms`);
        const queueJob = await shared_1.queueService.enqueue(constants_1.QUEUES.UPLOAD, `upload-\${platform}`, {
            projectId,
            filePath,
            metadata,
        }, {
            delay,
            attempts: 3,
            backoff: { type: "exponential", delay: 5000 }
        });
        return { jobId: queueJob.id, platform, delay };
    }
    // The actual execution logic run by the background worker
    async publishVideo(projectId, filePath, metadata) {
        const platform = metadata.targetPlatform || "YOUTUBE";
        const job = await JobService_1.jobService.createJob('UPLOAD', projectId, { platform, title: metadata.title });
        await JobService_1.jobService.updateJobStatus(job.id, 'RUNNING', 5);
        try {
            await database_1.prisma.jobLog.create({
                data: {
                    jobId: job.id, // assuming jobService.createJob uses real prisma under the hood eventually
                    level: "INFO",
                    message: `Starting \${platform} OAuth and Upload flow for \${metadata.title}`,
                }
            });
            console.log(`[PublishService] Executing upload to \${platform} for job \${job.id}`);
            const provider = this.providers[platform];
            if (!provider) {
                throw new Error(`No provider registered for platform: ${platform}`);
            }
            const result = await provider.uploadVideo(filePath, metadata, async (progress) => {
                const jobProgress = Math.floor(5 + (progress * 0.9));
                await JobService_1.jobService.updateJobStatus(job.id, 'RUNNING', jobProgress);
            });
            await database_1.prisma.jobLog.create({
                data: {
                    jobId: job.id,
                    level: "INFO",
                    message: `Upload to \${platform} complete. Status: \${result.status}`,
                }
            });
            const publishedRecord = await database_1.prisma.publishedVideo.create({
                data: {
                    title: metadata.title,
                    platform: platform,
                    url: result.url,
                    platformVideoId: result.platformVideoId,
                    status: result.status,
                    thumbnailUrl: metadata.thumbnailUrl,
                    projectId: projectId,
                }
            });
            await JobService_1.jobService.updateJobStatus(job.id, 'COMPLETED', 100);
            return {
                jobId: job.id,
                publishedRecord
            };
        }
        catch (error) {
            console.error("[PublishService] Upload failed:", error);
            await database_1.prisma.jobLog.create({
                data: {
                    jobId: job.id,
                    level: "ERROR",
                    message: `Upload to \${platform} failed: \${error.message || String(error)}`,
                }
            });
            await JobService_1.jobService.updateJobStatus(job.id, 'FAILED', 100);
            throw error;
        }
    }
}
exports.PublishService = PublishService;
exports.publishService = new PublishService();
