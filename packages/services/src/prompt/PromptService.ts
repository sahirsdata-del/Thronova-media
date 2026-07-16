export interface PromptTemplateData {
  id: string;
  name: string;
  purpose: string;
  systemPrompt: string;
  userPrompt: string;
  variables: Record<string, string>;
  version: number;
  isActive: boolean;
}

export class PromptService {
  async getTemplate(id: string): Promise<PromptTemplateData | null> {
    return {
      id,
      name: "Standard Tech Review",
      purpose: "Extract specs and pros/cons",
      systemPrompt: "You are an expert tech reviewer...",
      userPrompt: "Analyze the following device: {{device_name}}",
      variables: { device_name: "string" },
      version: 1,
      isActive: true
    };
  }

  async createTemplate(data: Omit<PromptTemplateData, 'id' | 'version'>): Promise<PromptTemplateData> {
    return {
      id: `prompt-${Date.now()}`,
      version: 1,
      ...data
    };
  }
}

export const promptService = new PromptService();
