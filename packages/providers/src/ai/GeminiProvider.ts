import { AIConfig } from "@thronova/config";
import { GoogleGenerativeAI, Schema } from "@google/generative-ai";
import { IAIProvider, AIGenerationOptions, AIResponse } from "./IAIProvider";

export class GeminiProvider implements IAIProvider {
  providerName = "Gemini";
  private genAI: GoogleGenerativeAI;
  
  // Default to gemini-1.5-flash for speed, or pro for reasoning
  private modelName = "gemini-1.5-pro";

  constructor() {
    const apiKey = AIConfig.GEMINI_API_KEY || "";
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  private async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async generateStructuredContent<T>(prompt: string, options: AIGenerationOptions): Promise<AIResponse<T>> {
    const startTime = Date.now();
    let attempt = 0;
    const maxRetries = options.retries ?? 3;

    while (attempt <= maxRetries) {
      try {
        const modelOptions: any = {
          model: this.modelName,
          generationConfig: {
            temperature: options.temperature ?? 0.7,
            responseMimeType: "application/json",
          }
        };

        if (options.systemInstruction) {
          modelOptions.systemInstruction = options.systemInstruction;
        }

        if (options.responseSchema) {
          modelOptions.generationConfig.responseSchema = options.responseSchema as Schema;
        }

        const model = this.genAI.getGenerativeModel(modelOptions);
        const result = await model.generateContent(prompt);
        
        const responseText = result.response.text();
        const parsedJson = JSON.parse(responseText);
        
        const durationMs = Date.now() - startTime;
        
        // Gemini doesn't always return exact token counts in the basic payload without counting explicitly,
        // but it is sometimes in result.response.usageMetadata. We will extract it if available.
        const usage = result.response.usageMetadata;
        
        return {
          result: parsedJson as T,
          rawJson: responseText,
          durationMs,
          metrics: {
            promptTokens: usage?.promptTokenCount ?? 0,
            completionTokens: usage?.candidatesTokenCount ?? 0,
            totalTokens: usage?.totalTokenCount ?? 0,
          }
        };

      } catch (error: any) {
        attempt++;
        const isRateLimit = error.status === 429 || error.message?.includes("429") || error.message?.includes("quota");
        
        if (isRateLimit && attempt <= maxRetries) {
          const delayMs = Math.pow(2, attempt) * 1000 + Math.random() * 1000; // Exponential backoff + jitter
          console.warn(`[GeminiProvider] Rate limit hit. Retrying in ${delayMs}ms (Attempt ${attempt}/${maxRetries})`);
          await this.sleep(delayMs);
          continue;
        }

        console.error(`[GeminiProvider] Error generating content:`, error);
        throw new Error(`Gemini Provider Error: ${error.message}`);
      }
    }

    throw new Error("Max retries exceeded for Gemini Provider.");
  }
}

export const geminiProvider = new GeminiProvider();
