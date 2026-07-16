import { EnvConfig } from "@thronova/config";
import * as http from "http";
import { logger } from "@thronova/utils";

// --- Health Check Server ---
const port = EnvConfig.PORT || Math.floor(Math.random() * (4000 - 3000) + 3000);
const healthServer = http.createServer((req, res) => {
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', worker: 'research', uptime: process.uptime() }));
  } else {
    res.writeHead(404);
    res.end();
  }
});
healthServer.listen(port, () => {
  logger.info(`[${'research'.toUpperCase()}] Health endpoint listening on port ${port}`);
});
// ---------------------------

import { QUEUES } from "@thronova/constants";
import { Worker } from "bullmq";
import { connection } from "@thronova/shared";

logger.info("Starting research worker...");

const worker = new Worker(QUEUES.RESEARCH, async (job) => {
  logger.info("Processing research job:", job.id);
  // Add specific integration here later
  return { status: "success", worker: "research" };
}, { connection: connection as any });
