"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflowService = exports.WorkflowService = void 0;
const shared_1 = require("@thronova/shared");
const database_1 = require("@thronova/database");
class WorkflowService {
    async pauseWorkflow(projectId) {
        console.log(`[WorkflowService] Pausing workflow for Project \${projectId}`);
        await database_1.prisma.project.update({
            where: { id: projectId },
            data: { status: "PAUSED" }
        });
        // In a full implementation, you might actively pause the BullMQ Queues here,
        // or rely on workers throwing exceptions if the project is PAUSED.
        return { success: true, status: "PAUSED" };
    }
    async resumeWorkflow(projectId) {
        console.log(`[WorkflowService] Resuming workflow for Project \${projectId}`);
        await database_1.prisma.project.update({
            where: { id: projectId },
            data: { status: "ACTIVE" }
        });
        // We would need to identify delayed jobs and promote them here, 
        // but relying on worker retries/delays handles this natively.
        return { success: true, status: "ACTIVE" };
    }
    async retryJob(queueName, jobId) {
        console.log(`[WorkflowService] Retrying job \${jobId} in queue \${queueName}`);
        const queue = shared_1.queueManager.getQueue(queueName);
        const job = await queue.getJob(jobId);
        if (!job) {
            throw new Error("Job not found");
        }
        if (await job.isFailed()) {
            await job.retry();
            return { success: true, message: "Job retried successfully" };
        }
        else {
            return { success: false, message: "Job is not in a failed state" };
        }
    }
    // Example middleware that workers should call to check pause state
    async checkPauseState(projectId) {
        const project = await database_1.prisma.project.findUnique({
            where: { id: projectId },
            select: { status: true }
        });
        if (project?.status === "PAUSED") {
            throw new Error("WORKFLOW_PAUSED");
        }
    }
}
exports.WorkflowService = WorkflowService;
exports.workflowService = new WorkflowService();
