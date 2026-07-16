import { ProviderConfig } from "@thronova/config";
import { IAnalyticsProvider, AnalyticsSnapshot } from "./IAnalyticsProvider";

export class MetaAnalyticsProvider implements IAnalyticsProvider {
  platformName = "Meta";

  async fetchVideoAnalytics(platformVideoId: string): Promise<AnalyticsSnapshot> {
    const pageAccessToken = ProviderConfig.META_PAGE_ACCESS_TOKEN;

    if (!pageAccessToken) {
      console.warn("[MetaAnalytics] Missing Graph API credentials. Returning simulated analytics.");
      return this.mockAnalytics(platformVideoId);
    }

    try {
      // In a real implementation, you would query the insights endpoint:
      // const res = await axios.get(\`https://graph.facebook.com/v19.0/\${platformVideoId}/insights\`, {
      //   params: {
      //     metric: 'video_views,likes,comments,video_avg_time_watched',
      //     access_token: pageAccessToken
      //   }
      // });
      // Map the response...

      return this.mockAnalytics(platformVideoId);
    } catch (error) {
      console.error("[MetaAnalytics] Failed to fetch analytics:", error);
      throw error;
    }
  }

  private mockAnalytics(videoId: string): AnalyticsSnapshot {
    const seed = videoId.charCodeAt(videoId.length - 1) || 1;
    const daysSincePublish = Math.floor(Math.random() * 15) + 1; // Instagram spikes faster

    // Reels viral simulation (High views, low retention)
    const views = Math.floor(seed * 500 * Math.pow(1.5, daysSincePublish));
    const likes = Math.floor(views * 0.08); // 8% like rate
    const comments = Math.floor(views * 0.01); // 1% comment rate
    const watchTime = (views * 0.25) / 60; // 15 seconds average watch time
    const retention = 20 + (Math.random() * 30); // 20-50%
    const ctr = 1 + (Math.random() * 3); // Reels don't really have CTR, but for consistency
    const subscribers = Math.floor(views * 0.002); // 0.2% follow rate
    const revenue = (views / 1000) * 0.80; // $0.80 RPM for Shorts/Reels

    return {
      views,
      likes,
      comments,
      watchTime: Number(watchTime.toFixed(1)),
      retention: Number(retention.toFixed(1)),
      ctr: Number(ctr.toFixed(1)),
      subscribers,
      revenue: Number(revenue.toFixed(2))
    };
  }
}

export const metaAnalyticsProvider = new MetaAnalyticsProvider();
