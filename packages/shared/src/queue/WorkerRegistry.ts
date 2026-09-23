import { Worker, Job } from "bullmq";
import { queueConnection as connection } from "./QueueManager";
import { prisma } from "@thronova/database";

type JobHandler = (job: Job) => Promise<any>;

export class WorkerRegistry {
  private workers: Map<string, Worker> = new Map();

  registerWorker(queueName: string, handler: JobHandler, concurrency: number = 1) {
    if (this.workers.has(queueName)) {
      console.warn(`Worker for ${queueName} already registered.`);
      return;
    }

    const worker = new Worker(queueName, handler, {
      connection: connection as any,
      concurrency,
    });

    worker.on('completed', async (job) => {
      console.log(`[${queueName}] Job ${job.id} completed.`);
      if (job.id) {
        try {
          await prisma.job.update({
            where: { id: job.id },
            data: { status: 'COMPLETED', progress: 100, finishedAt: new Date() }
          });
        } catch (e) {
          console.error(`Failed to update Prisma Job status to COMPLETED for ${job.id}`, e);
        }
      }
    });

    worker.on('failed', async (job, err) => {
      console.error(`[${queueName}] Job ${job?.id} failed: ${err.message}`);
      if (job?.id) {
        try {
          await prisma.job.update({
            where: { id: job.id },
            data: { status: 'FAILED', error: err.message, finishedAt: new Date() }
          });
        } catch (e) {
          console.error(`Failed to update Prisma Job status to FAILED for ${job.id}`, e);
        }
      }
    });

    this.workers.set(queueName, worker);
  }
}

export const workerRegistry = new WorkerRegistry();
