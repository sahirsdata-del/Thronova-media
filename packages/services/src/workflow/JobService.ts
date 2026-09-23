import { prisma, Job } from "@thronova/database";

export type JobStatus = 'QUEUED' | 'WAITING' | 'RUNNING' | 'PAUSED' | 'RETRYING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export class JobService {
  async createJob(type: string, projectId: string, payload?: any): Promise<Job> {
    const job = await prisma.job.create({
      data: {
        type,
        projectId,
        payload: payload || {},
        status: 'QUEUED',
        progress: 0,
      }
    });
    return job;
  }

  async updateJobStatus(jobId: string, status: JobStatus, progress: number, error?: string): Promise<Job | null> {
    const updateData: any = {
      status,
      progress,
    };
    
    if (error) {
      updateData.error = error;
    }
    
    if (status === 'RUNNING') {
      updateData.startedAt = new Date();
    } else if (status === 'COMPLETED' || status === 'FAILED' || status === 'CANCELLED') {
      updateData.finishedAt = new Date();
    }

    try {
      const job = await prisma.job.update({
        where: { id: jobId },
        data: updateData,
      });
      console.log(`[JobService] Updated job ${jobId}: ${status} (${progress}%)`);
      return job;
    } catch (err) {
      console.error(`[JobService] Failed to update job ${jobId}:`, err);
      return null;
    }
  }

  async getJobStatus(jobId: string): Promise<Job | null> {
    return prisma.job.findUnique({
      where: { id: jobId }
    });
  }
}

export const jobService = new JobService();
