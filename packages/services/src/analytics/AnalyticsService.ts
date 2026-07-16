
import { youtubeAnalyticsProvider } from "@thronova/providers";
import { metaAnalyticsProvider } from "@thronova/providers";

import { prisma } from "@thronova/database";

export class AnalyticsService {
  async syncDailyAnalytics() {
    console.log("[AnalyticsService] Starting daily analytics sync...");

    const publishedVideos = await prisma.publishedVideo.findMany({
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
          ? youtubeAnalyticsProvider 
          : metaAnalyticsProvider;

        const snapshot = await provider.fetchVideoAnalytics(video.platformVideoId!);

        // 1. Create a historical snapshot
        await prisma.analytics.create({
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
        await prisma.publishedVideo.update({
          where: { id: video.id },
          data: {
            views: snapshot.views,
            // Assuming duration is already set at publish time, but could be updated here if needed
          }
        });

        syncedCount++;
      } catch (error) {
        console.error(`[AnalyticsService] Failed to sync analytics for video \${video.id}`, error);
        failedCount++;
      }
    }

    console.log(`[AnalyticsService] Sync complete. Successfully synced: \${syncedCount}. Failed: \${failedCount}`);
    
    return { syncedCount, failedCount };
  }
}

export const analyticsService = new AnalyticsService();
