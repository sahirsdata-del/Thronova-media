import { EnvConfig } from "@thronova/config";
import IORedis from "ioredis";

export function createRedisConnection() {
  const host = EnvConfig.REDIS_HOST || "127.0.0.1";
  const port = EnvConfig.REDIS_PORT || 6379;
  const password = EnvConfig.REDIS_PASSWORD || undefined;

  return new IORedis({
    host,
    port,
    password,
    maxRetriesPerRequest: null,
  });
}

export const connection = createRedisConnection();
