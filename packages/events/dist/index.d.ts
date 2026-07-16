export interface BaseEvent {
    jobId: string;
    timestamp: number;
}
export interface ResearchCompletedEvent extends BaseEvent {
    researchId: string;
    topic: string;
}
export interface ScriptCompletedEvent extends BaseEvent {
    scriptId: string;
}
export interface VoiceCompletedEvent extends BaseEvent {
    voiceId: string;
}
export interface RenderCompletedEvent extends BaseEvent {
    renderId: string;
    filePath: string;
}
export interface UploadCompletedEvent extends BaseEvent {
    uploadId: string;
    url: string;
    platform: string;
}
export interface AnalyticsUpdatedEvent extends BaseEvent {
    videoId: string;
}
export interface CleanupCompletedEvent extends BaseEvent {
    bytesFreed: number;
}
export interface WorkflowStartedEvent extends BaseEvent {
    workflowId: string;
}
export interface WorkflowFinishedEvent extends BaseEvent {
    workflowId: string;
}
