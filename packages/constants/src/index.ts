export const QUEUES = {
  RESEARCH: "research-queue",
  SCRIPT: "script-queue",
  RENDER: "render-queue",
  UPLOAD: "upload-queue",
  ANALYTICS: "analytics-queue",
  NOTIFICATION: "notification-queue",
  CLEANUP: "cleanup-queue",
} as const;

export const WORKERS = {
  RESEARCH: "worker-research",
  SCRIPT: "worker-script",
  RENDER: "worker-render",
  UPLOAD: "worker-upload",
  ANALYTICS: "worker-analytics",
  NOTIFICATION: "worker-notification",
  CLEANUP: "worker-cleanup",
} as const;

export const STORAGE = {
  ASSETS: "assets",
  RENDERS: "renders",
  THUMBNAILS: "thumbnails",
} as const;

export const PLATFORMS = {
  YOUTUBE: "youtube",
  META: "meta",
  TIKTOK: "tiktok",
} as const;

export const AI_MODELS = {
  GEMINI_PRO: "gemini-1.5-pro",
  GEMINI_FLASH: "gemini-1.5-flash",
  GPT4: "gpt-4",
} as const;
