export declare class AnalyticsService {
    syncDailyAnalytics(): Promise<{
        syncedCount: number;
        failedCount: number;
    }>;
}
export declare const analyticsService: AnalyticsService;
