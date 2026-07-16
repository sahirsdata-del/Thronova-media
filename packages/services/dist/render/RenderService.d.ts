import { Storyboard } from "@thronova/schemas";
export interface IRemotionRunner {
    bundleAndRender(options: {
        entryPoint: string;
        compositionId: string;
        outputDir: string;
        jobId: string;
        storyboard: Storyboard;
        onProgress: (progress: number) => void;
    }): Promise<{
        videoPath: string;
        thumbPath: string;
    }>;
}
export declare class RenderService {
    private runner;
    registerRunner(runner: IRemotionRunner): void;
    startRender(projectId: string, storyboard: Storyboard): Promise<{
        jobId: string;
        videoUrl: string;
        thumbnailUrl: string;
    }>;
}
export declare const renderService: RenderService;
