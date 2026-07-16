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
export declare class PromptService {
    getTemplate(id: string): Promise<PromptTemplateData | null>;
    createTemplate(data: Omit<PromptTemplateData, 'id' | 'version'>): Promise<PromptTemplateData>;
}
export declare const promptService: PromptService;
