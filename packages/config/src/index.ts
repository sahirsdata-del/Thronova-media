export const EnvConfig = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  REDIS_URL: process.env.REDIS_URL || "",
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_PORT: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined,
  PORT: process.env.PORT || Math.floor(Math.random() * (4000 - 3000) + 3000),
  NODE_ENV: process.env.NODE_ENV || "development",
  CRON_SECRET: process.env.CRON_SECRET || "",
  STORAGE_ROOT: process.env.STORAGE_ROOT || "/opt/thronova-media/storage",
};

export const AIConfig = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
};

export const ProviderConfig = {
  PEXELS_API_KEY: process.env.PEXELS_API_KEY || "",
  YOUTUBE_CLIENT_ID: process.env.YOUTUBE_CLIENT_ID || "",
  YOUTUBE_CLIENT_SECRET: process.env.YOUTUBE_CLIENT_SECRET || "",
  YOUTUBE_REFRESH_TOKEN: process.env.YOUTUBE_REFRESH_TOKEN || "",
  YOUTUBE_REDIRECT_URL: process.env.YOUTUBE_REDIRECT_URL || "",
  META_APP_ID: process.env.META_APP_ID || "",
  META_APP_SECRET: process.env.META_APP_SECRET || "",
  META_PAGE_ACCESS_TOKEN: process.env.META_PAGE_ACCESS_TOKEN || "",
  GOOGLE_DRIVE_CLIENT_ID: process.env.GOOGLE_DRIVE_CLIENT_ID || "",
  GOOGLE_DRIVE_CLIENT_SECRET: process.env.GOOGLE_DRIVE_CLIENT_SECRET || "",
};
