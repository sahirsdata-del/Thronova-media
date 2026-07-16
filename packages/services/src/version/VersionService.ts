export interface ResearchVersionData {
  id: string;
  ideaId: string;
  versionNumber: number;
  summary: string;
  rawJson: any;
  confidenceScore: number;
  lastUpdated: Date;
}

export class VersionService {
  async saveVersion(ideaId: string, rawJson: any, summary: string, confidenceScore: number): Promise<ResearchVersionData> {
    // Mock save logic
    return {
      id: `ver-${Date.now()}`,
      ideaId,
      versionNumber: 1, // Logic would calculate max + 1
      summary,
      rawJson,
      confidenceScore,
      lastUpdated: new Date()
    };
  }

  async getVersions(ideaId: string): Promise<ResearchVersionData[]> {
    // Mock return
    return [];
  }

  async getVersion(versionId: string): Promise<ResearchVersionData | null> {
    return null;
  }
}

export const versionService = new VersionService();
