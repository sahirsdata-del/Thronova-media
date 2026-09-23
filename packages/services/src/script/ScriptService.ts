import { jobService } from "../workflow/JobService";
import { geminiProvider } from "@thronova/providers";
import { StoryboardSchema, Storyboard } from "@thronova/schemas";
import { prisma } from "@thronova/database";

export class ScriptService {
  async generateScript(ideaId: string, researchData: any, tone: string, language: string): Promise<Storyboard> {
    // 1. Create a script job
    const job = await jobService.createJob('SCRIPT', 'default-project', { ideaId });
    await jobService.updateJobStatus(job.id, 'RUNNING', 20);
    
    // 2. Prepare Gemini Prompt
    const systemPrompt = `You are a professional YouTube Scriptwriter and Storyboard Director. 
Your task is to transform the provided Research JSON into a full-production Storyboard JSON.
- Target Tone: ${tone}
- Language: ${language}
- Output must strictly adhere to the expected JSON schema.
- Break down the script into visual scenes with detailed visual instructions (visualPrompt) for the rendering engine.
- Every scene must explicitly list 'assetsNeeded'.`;

    const userPrompt = `Research Data:\n${JSON.stringify(researchData, null, 2)}`;

    // 3. Retry Loop for Zod Validation
    const maxZodRetries = 3;
    let attempt = 0;
    let lastError: Error | null = null;
    let validStoryboard: Storyboard | null = null;

    while (attempt <= maxZodRetries && !validStoryboard) {
      try {
        console.log(`[ScriptService] Requesting Storyboard from Gemini (Attempt ${attempt + 1})`);
        
        const response = await geminiProvider.generateStructuredContent<any>(userPrompt, {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          retries: 2 // Gemini internal network retries
          // Not passing responseSchema here so we strictly rely on Zod parsing for structure enforcement
        });
        
        // 4. Validate output using Zod schemas
        console.log(`[ScriptService] Parsing Gemini output with Zod...`);
        validStoryboard = StoryboardSchema.parse(response.result);
        
        // Save to database (ScriptVersion)
        const previousVersions = await prisma.scriptVersion.count({ where: { ideaId } });
        
        await prisma.scriptVersion.create({
          data: {
            ideaId,
            versionNumber: previousVersions + 1,
            title: validStoryboard.title || "Generated Script",
            rawJson: validStoryboard as any,
          }
        });
        
        // Create a JobLog
        await prisma.jobLog.create({
          data: {
            jobId: job.id,
            level: 'INFO',
            message: `Successfully generated storyboard script version ${previousVersions + 1}`,
          }
        });
        
        await jobService.updateJobStatus(job.id, 'COMPLETED', 100);
        return validStoryboard;
      } catch (err: any) {
        attempt++;
        lastError = err;
        console.warn(`[ScriptService] Zod Validation Failed on attempt ${attempt}:`, err.message);
        
        await prisma.jobLog.create({
          data: {
            jobId: job.id,
            level: 'WARN',
            message: `Validation failed on attempt ${attempt}: ${err.message}`,
          }
        });
        // On failure, it will loop and ask Gemini again.
      }
    }

    await jobService.updateJobStatus(job.id, 'FAILED', 100);
    throw new Error(`Failed to generate a valid Storyboard after ${maxZodRetries} attempts. Last Error: ${lastError?.message}`);
  }
}

export const scriptService = new ScriptService();
