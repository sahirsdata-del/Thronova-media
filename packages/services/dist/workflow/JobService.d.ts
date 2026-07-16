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
export declare class JobService {
    createJob(type: string, projectId: string, payload?: any): Promise<BaseJob>;
    updateJobStatus(jobId: string, status: JobStatus, progress: number, error?: string): Promise<void>;
    getJobStatus(jobId: string): Promise<BaseJob | null>;
}
export declare const jobService: JobService;
