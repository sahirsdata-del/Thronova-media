export type JobStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'RETRY';

export interface BaseJob {
  id: string;
  type: string;
  status: JobStatus;
  progress: number;
  error?: string;
  startedAt?: Date;
  finishedAt?: Date;
  projectId: string;
}

export class JobService {
  async createJob(type: string, projectId: string, payload?: any): Promise<BaseJob> {
    // Mock implementation
    return {
      id: `job-${Date.now()}`,
      type,
      status: 'PENDING',
      progress: 0,
      projectId,
    };
  }

  async updateJobStatus(jobId: string, status: JobStatus, progress: number, error?: string): Promise<void> {
    // Mock implementation
    console.log(`[JobService] Update job ${jobId}: ${status} (${progress}%) ${error || ''}`);
  }

  async getJobStatus(jobId: string): Promise<BaseJob | null> {
    // Mock implementation
    return null;
  }
}

export const jobService = new JobService();
