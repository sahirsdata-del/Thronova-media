import { VoiceProviderType } from "@thronova/providers";
export declare class VoiceService {
    generateVoiceForScene(projectId: string, scriptId: string, sceneId: string, narrationText: string, providerType?: VoiceProviderType): Promise<{
        jobId: string;
        fileUrl: string;
        duration: number;
    }>;
}
export declare const voiceService: VoiceService;
