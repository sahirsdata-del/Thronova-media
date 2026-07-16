"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voiceService = exports.VoiceService = void 0;
const JobService_1 = require("../workflow/JobService");
const providers_1 = require("@thronova/providers");
// import prisma from "@thronova/providers"; // Mocked for now
class VoiceService {
    async generateVoiceForScene(projectId, scriptId, sceneId, narrationText, providerType) {
        // 1. Create Job
        const job = await JobService_1.jobService.createJob('VOICEOVER', projectId, { scriptId, sceneId });
        await JobService_1.jobService.updateJobStatus(job.id, 'RUNNING', 10);
        try {
            // 2. Generate Audio via Provider
            const ttsProvider = providers_1.voiceEngine.getProvider(providerType);
            const audioResponse = await ttsProvider.generateAudio(narrationText, { voiceId: "en-US-Journey-F" });
            await JobService_1.jobService.updateJobStatus(job.id, 'RUNNING', 70);
            // 3. Save to Asset Storage (Mocked)
            // In production, we would upload audioResponse.audioBuffer to AWS S3.
            const fileUrl = audioResponse.mockUrl || `https://storage.thronova.com/audio/${sceneId}.mp3`;
            // 4. Save to Database
            /*
            const asset = await prisma.asset.create({
              data: {
                projectId,
                type: "AUDIO",
                title: `Voiceover - Scene ${sceneId}`,
                fileUrl,
                fileSizeBytes: 102400, // mock size
                mimeType: "audio/mp3",
                duration: audioResponse.durationSeconds,
                status: "READY"
              }
            });
            
            // Bind to SceneAsset...
            */
            await JobService_1.jobService.updateJobStatus(job.id, 'COMPLETED', 100);
            return {
                jobId: job.id,
                fileUrl,
                duration: audioResponse.durationSeconds
            };
        }
        catch (error) {
            console.error(`[VoiceService] Failed to generate voice:`, error);
            await JobService_1.jobService.updateJobStatus(job.id, 'FAILED', 100);
            throw new Error(`Voice generation failed: ${error.message}`);
        }
    }
}
exports.VoiceService = VoiceService;
exports.voiceService = new VoiceService();
