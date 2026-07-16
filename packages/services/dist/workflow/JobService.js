"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobService = exports.JobService = void 0;
class JobService {
    async createJob(type, projectId, payload) {
        // Mock implementation
        return {
            id: `job-${Date.now()}`,
            type,
            status: 'PENDING',
            progress: 0,
            projectId,
        };
    }
    async updateJobStatus(jobId, status, progress, error) {
        // Mock implementation
        console.log(`[JobService] Update job ${jobId}: ${status} (${progress}%) ${error || ''}`);
    }
    async getJobStatus(jobId) {
        // Mock implementation
        return null;
    }
}
exports.JobService = JobService;
exports.jobService = new JobService();
