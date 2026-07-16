export interface AnalyticsSnapshot {
  views: number;
  likes: number;
  comments: number;
  watchTime: number; // in hours
  retention: number; // percentage (0-100)
  ctr: number;       // percentage (0-100)
  subscribers: number;
  revenue: number;
}

export interface IAnalyticsProvider {
  platformName: string;
  fetchVideoAnalytics(platformVideoId: string): Promise<AnalyticsSnapshot>;
}
