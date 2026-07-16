
import { performanceEngine } from "@thronova/providers";

import { prisma } from "@thronova/database";

export class PerformanceService {
  async evaluateRecentVideos() {
    console.log("[PerformanceService] Checking for videos requiring AI evaluation...");

    // Find videos that have analytics but don't have a performance report generated in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const eligibleVideos = await prisma.publishedVideo.findMany({
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
        
        const report = await performanceEngine.evaluateVideo(
          video.title,
          video.platform,
          {
            views: latestAnalytics.views,
            likes: latestAnalytics.likes,
            comments: latestAnalytics.comments,
            retention: latestAnalytics.retention,
            ctr: latestAnalytics.ctr,
            watchTime: latestAnalytics.watchTime
          }
        );

        await prisma.performanceReport.create({
          data: {
            publishedVideoId: video.id,
            score: report.score,
            analysis: report.analysis,
            recommendations: report.recommendations,
            nextIdeas: report.nextIdeas
          }
        });

        console.log(`[PerformanceService] Generated report for \${video.id} with score \${report.score}`);

      } catch (error) {
        console.error(`[PerformanceService] Failed to evaluate video \${video.id}`, error);
      }
    }
  }
}

export const performanceService = new PerformanceService();
