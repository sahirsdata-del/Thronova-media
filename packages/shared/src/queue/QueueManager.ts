import { EnvConfig } from "@thronova/config";
import { Queue, QueueOptions } from "bullmq";
import IORedis from "ioredis";

// MOCK REDIS CONNECTION FOR UI PREVIEW (Prevents crash if redis isn't running locally)
const mockRedis = {
  status: 'ready',
  on: () => {},
  quit: () => {},
} as unknown as IORedis;

export const queueConnection = EnvConfig.NODE_ENV === "production" 
  ? new IORedis(EnvConfig.REDIS_URL || "redis://localhost:6379", { maxRetriesPerRequest: null })
  : mockRedis;

const defaultQueueOptions: QueueOptions = {
  connection: queueConnection as any,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: { age: 24 * 3600 },
    removeOnFail: { age: 7 * 24 * 3600 },
  }
};

class QueueManager {
  private queues: Map<string, Queue> = new Map();

  getQueue(name: string): Queue {
    if (!this.queues.has(name)) {
      this.queues.set(name, new Queue(name, defaultQueueOptions));
    }
    return this.queues.get(name)!;
  }

  // Pre-defined enterprise queues
  get researchQueue() { return this.getQueue("research"); }
  get scriptQueue() { return this.getQueue("script"); }
  get assetQueue() { return this.getQueue("asset"); }
  get renderQueue() { return this.getQueue("render"); }
  get uploadQueue() { return this.getQueue("upload"); }
  get voiceQueue() { return this.getQueue("voice"); }
  get cleanupQueue() { return this.getQueue("cleanup"); }
}

export const queueManager = new QueueManager();










