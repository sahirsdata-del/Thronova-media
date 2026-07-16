import { Worker, Job } from "bullmq";
import { connection } from "./QueueManager";

type JobHandler = (job: Job) => Promise<any>;

export class WorkerRegistry {
  private workers: Map<string, Worker> = new Map();

  registerWorker(queueName: string, handler: JobHandler, concurrency: number = 1) {
    if (this.workers.has(queueName)) {
      console.warn(`Worker for ${queueName} already registered.`);
      return;
    }

    const worker = new Worker(queueName, handler, {
      connection,
      concurrency,
    });

    worker.on('completed', (job) => {
      console.log(`[${queueName}] Job ${job.id} completed.`);
      // TODO: Update Prisma status to COMPLETED
    });

    worker.on('failed', (job, err) => {
      console.error(`[${queueName}] Job ${job?.id} failed: ${err.message}`);
      // TODO: Update Prisma status to FAILED, log error
    });

    this.workers.set(queueName, worker);
  }
}

export const workerRegistry = new WorkerRegistry();
