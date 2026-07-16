export interface AIUsageMetrics {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUsd?: number;
}

export interface AIResponse<T = any> {
  result: T;
  rawJson?: string;
  metrics: AIUsageMetrics;
  durationMs: number;
}

export interface AIGenerationOptions {
  systemInstruction?: string;
  temperature?: number;
  responseSchema?: any; // Native JSON schema object for structured outputs
  retries?: number;
}

export interface IAIProvider {
  providerName: string;
  generateStructuredContent<T>(prompt: string, options: AIGenerationOptions): Promise<AIResponse<T>>;
}
