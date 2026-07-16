
import { queueManager } from "@thronova/shared";

import { prisma } from "@thronova/database";

export class WorkflowService {
  
  async pauseWorkflow(projectId: string) {
    console.log(`[WorkflowService] Pausing workflow for Project \${projectId}`);
    await prisma.project.update({
      where: { id: projectId },
      data: { status: "PAUSED" }
    });
    
    // In a full implementation, you might actively pause the BullMQ Queues here,
    // or rely on workers throwing exceptions if the project is PAUSED.
    return { success: true, status: "PAUSED" };
  }

  async resumeWorkflow(projectId: string) {
    console.log(`[WorkflowService] Resuming workflow for Project \${projectId}`);
    await prisma.project.update({
      where: { id: projectId },
      data: { status: "ACTIVE" }
    });
    
    // We would need to identify delayed jobs and promote them here, 
    // but relying on worker retries/delays handles this natively.
    return { success: true, status: "ACTIVE" };
  }

  async retryJob(queueName: string, jobId: string) {
    console.log(`[WorkflowService] Retrying job \${jobId} in queue \${queueName}`);
    const queue = queueManager.getQueue(queueName);
    const job = await queue.getJob(jobId);
    
    if (!job) {
      throw new Error("Job not found");
    }

    if (await job.isFailed()) {
      await job.retry();
      return { success: true, message: "Job retried successfully" };
    } else {
      return { success: false, message: "Job is not in a failed state" };
    }
  }

  // Example middleware that workers should call to check pause state
  async checkPauseState(projectId: string) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { status: true }
    });
    
    if (project?.status === "PAUSED") {
      throw new Error("WORKFLOW_PAUSED");
    }
  }
}

export const workflowService = new WorkflowService();
