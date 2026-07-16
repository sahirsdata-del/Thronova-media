"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI_MODELS = exports.PLATFORMS = exports.STORAGE = exports.WORKERS = exports.QUEUES = void 0;
exports.QUEUES = {
    RESEARCH: "research-queue",
    SCRIPT: "script-queue",
    RENDER: "render-queue",
    UPLOAD: "upload-queue",
    ANALYTICS: "analytics-queue",
    NOTIFICATION: "notification-queue",
    CLEANUP: "cleanup-queue",
};
exports.WORKERS = {
    RESEARCH: "worker-research",
    SCRIPT: "worker-script",
    RENDER: "worker-render",
    UPLOAD: "worker-upload",
    ANALYTICS: "worker-analytics",
    NOTIFICATION: "worker-notification",
    CLEANUP: "worker-cleanup",
};
exports.STORAGE = {
    ASSETS: "assets",
    RENDERS: "renders",
    THUMBNAILS: "thumbnails",
};
exports.PLATFORMS = {
    YOUTUBE: "youtube",
    META: "meta",
    TIKTOK: "tiktok",
};
exports.AI_MODELS = {
    GEMINI_PRO: "gemini-1.5-pro",
    GEMINI_FLASH: "gemini-1.5-flash",
    GPT4: "gpt-4",
};
