import { queueManager } from "./QueueManager";
import { JobsOptions } from "bullmq";
// import prisma from "../prisma"; // Mocked for now

export class QueueService {
  async enqueue(queueName: string, name: string, payload: any, options?: JobsOptions) {
    const queue = queueManager.getQueue(queueName);
    
    // 1. Add to BullMQ
    const job = await queue.add(name, payload, options);
    
    // 2. Persist metadata to Prisma (Mocked here)
    // await prisma.job.create({ data: { id: job.id, queueName, payload, status: 'QUEUED' } });
    
    return job;
  }

  async pauseQueue(queueName: string) {
    return queueManager.getQueue(queueName).pause();
  }

  async resumeQueue(queueName: string) {
    return queueManager.getQueue(queueName).resume();
  }

  async getJobStatus(queueName: string, jobId: string) {
    const queue = queueManager.getQueue(queueName);
    return queue.getJob(jobId);
  }

  async cancelJob(queueName: string, jobId: string) {
    const job = await this.getJobStatus(queueName, jobId);
    if (job) await job.remove();
  }
}

export const queueService = new QueueService();
