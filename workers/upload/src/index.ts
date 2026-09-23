import { EnvConfig } from "@thronova/config";
import * as http from "http";
import { logger } from "@thronova/utils";

// --- Health Check Server ---
const port = EnvConfig.PORT || Math.floor(Math.random() * (4000 - 3000) + 3000);
const healthServer = http.createServer((req, res) => {
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', worker: 'upload', uptime: process.uptime() }));
  } else {
    res.writeHead(404);
    res.end();
  }
});
healthServer.listen(port, () => {
  logger.info(`[${'upload'.toUpperCase()}] Health endpoint listening on port ${port}`);
});
// ---------------------------

import { QUEUES } from "@thronova/constants";
import { Worker } from "bullmq";
import { connection } from "@thronova/shared";

import { publishService, storageService } from "@thronova/services";
import { YouTubeProvider, MetaProvider } from "@thronova/providers";

// Initialize Dependency Injection
const youtubeProvider = new YouTubeProvider(storageService.getProvider());
const metaProvider = new MetaProvider(storageService.getProvider());

publishService.registerProvider("YOUTUBE", youtubeProvider);
publishService.registerProvider("META", metaProvider);

logger.info("Starting upload worker...");

const worker = new Worker(QUEUES.UPLOAD, async (job) => {
  logger.info("Processing upload job:", job.id);
  
  const { projectId, filePath, metadata } = job.data;
  
  if (!projectId || !filePath || !metadata) {
    throw new Error("Missing required upload job data: projectId, filePath, or metadata");
  }

  try {
    const result = await publishService.publishVideo(projectId, filePath, metadata);
    return { status: "success", worker: "upload", result };
  } catch (error: any) {
    logger.error(`Upload job ${job.id} failed:`, error.message);
    throw error;
  }
}, { connection: connection as any });
