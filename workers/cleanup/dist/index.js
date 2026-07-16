"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@thronova/config");
const http = __importStar(require("http"));
const utils_1 = require("@thronova/utils");
// --- Health Check Server ---
const port = config_1.EnvConfig.PORT || Math.floor(Math.random() * (4000 - 3000) + 3000);
const healthServer = http.createServer((req, res) => {
    if (req.url === '/health' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'OK', worker: 'cleanup', uptime: process.uptime() }));
    }
    else {
        res.writeHead(404);
        res.end();
    }
});
healthServer.listen(port, () => {
    utils_1.logger.info(`[${'cleanup'.toUpperCase()}] Health endpoint listening on port ${port}`);
});
// ---------------------------
const bullmq_1 = require("bullmq");
const constants_1 = require("@thronova/constants");
const shared_1 = require("@thronova/shared");
const services_1 = require("@thronova/services");
const os = __importStar(require("os"));
const workerName = `cleanup-worker-${os.hostname()}`;
async function processJob(job) {
    utils_1.logger.info(`[CleanupWorker] Processing job ${job.id} of type ${job.name}`);
    if (job.name === "periodic-cleanup") {
        const result = await services_1.storageService.executeCleanupCycle(workerName);
        return {
            status: "success",
            bytesFreed: result.bytesFreed.toString(), // BigInt is not JSON serializable natively
            filesDeleted: result.filesDeleted,
        };
    }
    throw new Error(`Unknown job type: ${job.name}`);
}
async function bootstrap() {
    utils_1.logger.info(`[CleanupWorker] Starting worker node: ${workerName}`);
    const worker = new bullmq_1.Worker(constants_1.QUEUES.CLEANUP, processJob, {
        connection: shared_1.queueManager.cleanupQueue.opts.connection,
        concurrency: 1, // Only run 1 cleanup cycle at a time
    });
    worker.on("completed", (job) => {
        utils_1.logger.info(`[CleanupWorker] Job ${job.id} completed successfully`);
    });
    worker.on("failed", (job, err) => {
        utils_1.logger.error(`[CleanupWorker] Job ${job?.id} failed with error:`, err);
    });
    // Schedule the recurring job every hour
    await shared_1.queueManager.cleanupQueue.add("periodic-cleanup", {}, {
        repeat: {
            pattern: "0 * * * *", // Top of every hour
        },
        jobId: "periodic-cleanup-job", // Prevent duplicates
    });
    utils_1.logger.info(`[CleanupWorker] Registered periodic cleanup job (runs hourly)`);
    // Also run one immediately on startup for testing/convenience
    await shared_1.queueManager.cleanupQueue.add("periodic-cleanup", {}, { jobId: `startup-${Date.now()}` });
    // Handle graceful shutdown
    process.on("SIGTERM", async () => {
        utils_1.logger.info("[CleanupWorker] Shutting down gracefully...");
        await worker.close();
        process.exit(0);
    });
}
bootstrap().catch(utils_1.logger.error);
