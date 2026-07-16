export declare class WorkflowService {
    pauseWorkflow(projectId: string): Promise<{
        success: boolean;
        status: string;
    }>;
    resumeWorkflow(projectId: string): Promise<{
        success: boolean;
        status: string;
    }>;
    retryJob(queueName: string, jobId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    checkPauseState(projectId: string): Promise<void>;
}
export declare const workflowService: WorkflowService;
