import { jobService } from "../workflow/JobService";
import path from "path";
import { Storyboard } from "@thronova/schemas";
import { storageService } from "../storage/StorageService";
import { EnvConfig } from "@thronova/config";

export interface IRemotionRunner {
  bundleAndRender(options: {
    entryPoint: string;
    compositionId: string;
    outputDir: string;
    jobId: string;
    storyboard: Storyboard;
    onProgress: (progress: number) => void;
  }): Promise<{ videoPath: string; thumbPath: string }>;
}

export class RenderService {
  private runner: IRemotionRunner | null = null;

  registerRunner(runner: IRemotionRunner) {
    this.runner = runner;
  }
  async startRender(projectId: string, storyboard: Storyboard) {
    // 1. Create a job
    const job = await jobService.createJob('RENDER', projectId, { storyboardTitle: storyboard.title });
    await jobService.updateJobStatus(job.id, 'RUNNING', 10);
    
    try {
      // 2. Resolve Paths
      const compositionId = "MainVideo";
      const entryPoint = path.resolve(process.cwd(), "src/remotion/index.ts");
      if (!this.runner) {
        throw new Error("No Remotion runner registered. Make sure this is running in the Render Worker.");
      }

      const outputDir = path.resolve(process.cwd(), EnvConfig.STORAGE_ROOT || "public/renders");
      if (!(await storageService.getProvider().exists(outputDir))) {
        await storageService.getProvider().createDir(outputDir);
      }
      
      const { videoPath, thumbPath } = await this.runner.bundleAndRender({
        entryPoint,
        compositionId,
        outputDir,
        jobId: job.id,
        storyboard,
        onProgress: async (progress) => {
          const currentProgress = Math.floor(10 + (progress * 85));
          await jobService.updateJobStatus(job.id, 'RUNNING', currentProgress);
        }
      });

      // 7. Save Stats & Complete
      console.log(`[RenderService] Render Complete: ${videoPath}`);
      await jobService.updateJobStatus(job.id, 'COMPLETED', 100);

      return {
        jobId: job.id,
        videoUrl: `/renders/\${job.id}.mp4`,
        thumbnailUrl: `/renders/\${job.id}_thumb.jpeg`
      };

    } catch (error: any) {
      console.error(`[RenderService] Render Failed:`, error);
      await jobService.updateJobStatus(job.id, 'FAILED', 100);
      throw error;
    }
  }
}

export const renderService = new RenderService();
