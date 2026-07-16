import { FlowProducer } from "bullmq";
import { queueConnection } from "./QueueManager";

export class WorkflowEngine {
  private flowProducer = new FlowProducer({ connection: queueConnection as any });

  async startFullProductionWorkflow(projectId: string, ideaId: string, metadata?: any) {
    // Defines a Flow: Research -> Script -> Voice -> Assets -> Render -> Thumbnail -> Upload -> Analytics
    // In BullMQ, children execute BEFORE parents in the hierarchy.
    
    console.log(`[WorkflowEngine] Starting One-Click Production Pipeline for Project ${projectId}`);

    const flow = await this.flowProducer.add({
      name: "SyncAnalytics",
      queueName: "analytics",
      data: { projectId },
      opts: { delay: 1000 * 60 * 60 * 24 }, // Delay analytics sync by 24 hours
      children: [
        {
          name: "UploadVideo",
          queueName: "upload",
          data: { projectId, metadata },
          children: [
            {
              name: "GenerateThumbnail",
              queueName: "thumbnail",
              data: { projectId },
              children: [
                {
                  name: "RenderVideo",
                  queueName: "render",
                  data: { projectId },
                  children: [
                    {
                      name: "DownloadAssets",
                      queueName: "asset",
                      data: { projectId },
                      children: [
                        {
                          name: "GenerateVoice",
                          queueName: "voice",
                          data: { projectId },
                          children: [
                            {
                              name: "GenerateScript",
                              queueName: "script",
                              data: { projectId, ideaId },
                              children: [
                                {
                                  name: "PerformResearch",
                                  queueName: "research",
                                  data: { ideaId, projectId }
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });

    return flow;
  }
}

export const workflowEngine = new WorkflowEngine();
