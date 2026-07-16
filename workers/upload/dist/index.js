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
        res.end(JSON.stringify({ status: 'OK', worker: 'upload', uptime: process.uptime() }));
    }
    else {
        res.writeHead(404);
        res.end();
    }
});
healthServer.listen(port, () => {
    utils_1.logger.info(`[${'upload'.toUpperCase()}] Health endpoint listening on port ${port}`);
});
// ---------------------------
const constants_1 = require("@thronova/constants");
const bullmq_1 = require("bullmq");
const shared_1 = require("@thronova/shared");
const services_1 = require("@thronova/services");
const providers_1 = require("@thronova/providers");
// Initialize Dependency Injection
const youtubeProvider = new providers_1.YouTubeProvider(services_1.storageService.getProvider());
const metaProvider = new providers_1.MetaProvider(services_1.storageService.getProvider());
services_1.publishService.registerProvider("YOUTUBE", youtubeProvider);
services_1.publishService.registerProvider("META", metaProvider);
utils_1.logger.info("Starting upload worker...");
const worker = new bullmq_1.Worker(constants_1.QUEUES.UPLOAD, async (job) => {
    utils_1.logger.info("Processing upload job:", job.id);
    // Add specific integration here later
    return { status: "success", worker: "upload" };
}, { connection: shared_1.connection });
