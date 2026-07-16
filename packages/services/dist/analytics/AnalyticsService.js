"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsService = exports.AnalyticsService = void 0;
const providers_1 = require("@thronova/providers");
const providers_2 = require("@thronova/providers");
const database_1 = require("@thronova/database");
class AnalyticsService {
    async syncDailyAnalytics() {
        console.log("[AnalyticsService] Starting daily analytics sync...");
        const publishedVideos = await database_1.prisma.publishedVideo.findMany({
            where: {
                status: "PUBLISHED",
                platformVideoId: { not: null }
            }
        });
        console.log(`[AnalyticsService] Found \${publishedVideos.length} published videos to sync.`);
        let syncedCount = 0;
        let failedCount = 0;
        for (const video of publishedVideos) {
            try {
                const provider = video.platform.toLowerCase() === "youtube"
                    ? providers_1.youtubeAnalyticsProvider
                    : providers_2.metaAnalyticsProvider;
                const snapshot = await provider.fetchVideoAnalytics(video.platformVideoId);
                // 1. Create a historical snapshot
                await database_1.prisma.analytics.create({
                    data: {
                        publishedVideoId: video.id,
                        views: snapshot.views,
                        likes: snapshot.likes,
                        comments: snapshot.comments,
                        watchTime: snapshot.watchTime,
                        retention: snapshot.retention,
                        ctr: snapshot.ctr,
                        subscribers: snapshot.subscribers,
                        revenue: snapshot.revenue,
                    }
                });
                // 2. Update the master PublishedVideo record with latest topline metrics
                await database_1.prisma.publishedVideo.update({
                    where: { id: video.id },
                    data: {
                        views: snapshot.views,
                        // Assuming duration is already set at publish time, but could be updated here if needed
                    }
                });
                syncedCount++;
            }
            catch (error) {
                console.error(`[AnalyticsService] Failed to sync analytics for video \${video.id}`, error);
                failedCount++;
            }
        }
        console.log(`[AnalyticsService] Sync complete. Successfully synced: \${syncedCount}. Failed: \${failedCount}`);
        return { syncedCount, failedCount };
    }
}
exports.AnalyticsService = AnalyticsService;
exports.analyticsService = new AnalyticsService();
