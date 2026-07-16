"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceService = exports.PerformanceService = void 0;
const providers_1 = require("@thronova/providers");
const database_1 = require("@thronova/database");
class PerformanceService {
    async evaluateRecentVideos() {
        console.log("[PerformanceService] Checking for videos requiring AI evaluation...");
        // Find videos that have analytics but don't have a performance report generated in the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const eligibleVideos = await database_1.prisma.publishedVideo.findMany({
            where: {
                status: "PUBLISHED",
                analytics: { some: {} },
                OR: [
                    { performanceReports: { none: {} } },
                    { performanceReports: { every: { createdAt: { lt: sevenDaysAgo } } } }
                ]
            },
            include: {
                analytics: {
                    orderBy: { recordedAt: 'desc' },
                    take: 1
                }
            },
            take: 5 // Rate limit how many we process at once
        });
        console.log(`[PerformanceService] Found \${eligibleVideos.length} videos to evaluate.`);
        for (const video of eligibleVideos) {
            try {
                const latestAnalytics = video.analytics[0];
                const report = await providers_1.performanceEngine.evaluateVideo(video.title, video.platform, {
                    views: latestAnalytics.views,
                    likes: latestAnalytics.likes,
                    comments: latestAnalytics.comments,
                    retention: latestAnalytics.retention,
                    ctr: latestAnalytics.ctr,
                    watchTime: latestAnalytics.watchTime
                });
                await database_1.prisma.performanceReport.create({
                    data: {
                        publishedVideoId: video.id,
                        score: report.score,
                        analysis: report.analysis,
                        recommendations: report.recommendations,
                        nextIdeas: report.nextIdeas
                    }
                });
                console.log(`[PerformanceService] Generated report for \${video.id} with score \${report.score}`);
            }
            catch (error) {
                console.error(`[PerformanceService] Failed to evaluate video \${video.id}`, error);
            }
        }
    }
}
exports.PerformanceService = PerformanceService;
exports.performanceService = new PerformanceService();
