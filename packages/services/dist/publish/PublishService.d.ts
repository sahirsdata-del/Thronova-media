import { IUploadProvider, UploadMetadata } from "@thronova/providers";
export declare class PublishService {
    private providers;
    registerProvider(platform: string, provider: IUploadProvider): void;
    scheduleUpload(projectId: string, filePath: string, metadata: UploadMetadata, scheduledTime?: Date): Promise<{
        jobId: string | undefined;
        platform: "YOUTUBE" | "INSTAGRAM" | "FACEBOOK";
        delay: number;
    }>;
    publishVideo(projectId: string, filePath: string, metadata: UploadMetadata): Promise<{
        jobId: string;
        publishedRecord: {
            id: string;
            status: string;
            title: string;
            platformVideoId: string | null;
            url: string;
            projectId: string;
            duration: number | null;
            thumbnailUrl: string | null;
            platform: string;
            views: number;
            publishedAt: Date;
        };
    }>;
}
export declare const publishService: PublishService;
