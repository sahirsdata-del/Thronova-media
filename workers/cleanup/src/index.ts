import { EnvConfig } from "@thronova/config";
import * as http from "http";
import { logger } from "@thronova/utils";

// --- Health Check Server ---
const port = EnvConfig.PORT || Math.floor(Math.random() * (4000 - 3000) + 3000);
const healthServer = http.createServer((req, res) => {
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', worker: 'cleanup', uptime: process.uptime() }));
  } else {
    res.writeHead(404);
    res.end();
  }
});
healthServer.listen(port, () => {
  logger.info(`[${'cleanup'.toUpperCase()}] Health endpoint listening on port ${port}`);
});
// ---------------------------

import { Worker, Job } from "bullmq";
import { QUEUES } from "@thronova/constants";
import { queueManager } from "@thronova/shared";
import { storageService } from "@thronova/services";
import * as os from "os";

const workerName = `cleanup-worker-${os.hostname()}`;

async function processJob(job: Job) {
  logger.info(`[CleanupWorker] Processing job ${job.id} of type ${job.name}`);
  
  if (job.name === "periodic-cleanup") {
    const result = await storageService.executeCleanupCycle(workerName);
    return {
      status: "success",
      bytesFreed: result.bytesFreed.toString(), // BigInt is not JSON serializable natively
      filesDeleted: result.filesDeleted,
    };
  }

  throw new Error(`Unknown job type: ${job.name}`);
}

async function bootstrap() {
  logger.info(`[CleanupWorker] Starting worker node: ${workerName}`);
  
  const worker = new Worker(QUEUES.CLEANUP, processJob, {
    connection: queueManager.cleanupQueue.opts.connection,
    concurrency: 1, // Only run 1 cleanup cycle at a time
  });

  worker.on("completed", (job) => {
    logger.info(`[CleanupWorker] Job ${job.id} completed successfully`);
  });

  worker.on("failed", (job, err) => {
    logger.error(`[CleanupWorker] Job ${job?.id} failed with error:`, err);
  });

  // Schedule the recurring job every hour
  await queueManager.cleanupQueue.add(
    "periodic-cleanup",
    {},
    {
      repeat: {
        pattern: "0 * * * *", // Top of every hour
      },
      jobId: "periodic-cleanup-job", // Prevent duplicates
    }
  );

  logger.info(`[CleanupWorker] Registered periodic cleanup job (runs hourly)`);
  
  // Also run one immediately on startup for testing/convenience
  await queueManager.cleanupQueue.add("periodic-cleanup", {}, { jobId: `startup-${Date.now()}` });

  // Handle graceful shutdown
  process.on("SIGTERM", async () => {
    logger.info("[CleanupWorker] Shutting down gracefully...");
    await worker.close();
    process.exit(0);
  });
}

bootstrap().catch(logger.error);
