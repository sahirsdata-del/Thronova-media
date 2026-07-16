import { jobService } from "../workflow/JobService";
import { voiceEngine, VoiceProviderType } from "@thronova/providers";
// import prisma from "@thronova/providers"; // Mocked for now

export class VoiceService {
  async generateVoiceForScene(projectId: string, scriptId: string, sceneId: string, narrationText: string, providerType?: VoiceProviderType) {
    // 1. Create Job
    const job = await jobService.createJob('VOICEOVER', projectId, { scriptId, sceneId });
    await jobService.updateJobStatus(job.id, 'RUNNING', 10);
    
    try {
      // 2. Generate Audio via Provider
      const ttsProvider = voiceEngine.getProvider(providerType);
      const audioResponse = await ttsProvider.generateAudio(narrationText, { voiceId: "en-US-Journey-F" });
      await jobService.updateJobStatus(job.id, 'RUNNING', 70);
      
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

      await jobService.updateJobStatus(job.id, 'COMPLETED', 100);
      
      return {
        jobId: job.id,
        fileUrl,
        duration: audioResponse.durationSeconds
      };

    } catch (error: any) {
      console.error(`[VoiceService] Failed to generate voice:`, error);
      await jobService.updateJobStatus(job.id, 'FAILED', 100);
      throw new Error(`Voice generation failed: ${error.message}`);
    }
  }
}

export const voiceService = new VoiceService();
