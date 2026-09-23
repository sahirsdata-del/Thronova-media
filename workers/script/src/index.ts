import * as path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

import { EnvConfig } from "@thronova/config";
import { prisma } from "@thronova/database";
import * as http from "http";
import { logger } from "@thronova/utils";

// --- Health Check Server ---
const port = EnvConfig.PORT || Math.floor(Math.random() * (4000 - 3000) + 3000);
const healthServer = http.createServer((req, res) => {
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', worker: 'script', uptime: process.uptime() }));
  } else {
    res.writeHead(404);
    res.end();
  }
});
healthServer.listen(port, () => {
  logger.info(`[${'script'.toUpperCase()}] Health endpoint listening on port ${port}`);
});
// ---------------------------

import { QUEUES } from "@thronova/constants";
import { Worker } from "bullmq";
import { connection } from "@thronova/shared";

logger.info("Starting script worker...");
import { geminiProvider } from "@thronova/providers/dist/ai/GeminiProvider";

const worker = new Worker(QUEUES.SCRIPT, async (job) => {
  logger.info(`Processing script job: ${job.id} - Title: ${job.data.title}`);
  
  try {
    const prompt = `Write a short, engaging YouTube Shorts script about: ${job.data.title}. Category: ${job.data.category}. Respond with JSON format { "script": "..." }`;
    
    logger.info("Calling Gemini API...");
    const response = await geminiProvider.generateStructuredContent<{script: string}>(prompt, {
      temperature: 0.7,
    });
    
    logger.info(`Generated script successfully! Output preview: ${response.result.script.substring(0, 100)}...`);
    
    // Save to Prisma DB
    await prisma.scriptVersion.create({
      data: {
        ideaId: job.data.ideaId,
        versionNumber: 1,
        title: job.data.title,
        rawJson: { content: response.result.script },
      }
    });

    await prisma.contentIdea.update({
      where: { id: job.data.ideaId },
      data: { status: "READY" }
    });
    
    return { status: "success", script: response.result.script };
  } catch (error: any) {
    logger.error("Script generation failed:", error.message);
    throw error;
  }
}, { connection: connection as any });
