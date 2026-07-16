import { workerRegistry } from "./WorkerRegistry";
import { publishService } from "../services/PublishService";

export function initWorkers() {
  console.log("[WorkerRegistry] Initializing all background workers...");

  workerRegistry.registerWorker("upload", async (job) => {
    console.log(\`[Worker] Processing upload job \${job.id}\`);
    const { projectId, filePath, metadata } = job.data;
    
    // In a real scenario, filePath might come from the render job output
    const mockFilePath = filePath || "public/renders/mock.mp4";
    
    return await publishService.publishVideo(projectId, mockFilePath, metadata);
  });

  // We can add the other workers (research, render, etc.) here as well
}
