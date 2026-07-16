"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scriptService = exports.ScriptService = void 0;
const JobService_1 = require("../workflow/JobService");
const providers_1 = require("@thronova/providers");
const schemas_1 = require("@thronova/schemas");
class ScriptService {
    async generateScript(ideaId, researchData, tone, language) {
        // 1. Create a script job
        const job = await JobService_1.jobService.createJob('SCRIPT', 'default-project', { ideaId });
        await JobService_1.jobService.updateJobStatus(job.id, 'RUNNING', 20);
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
        let lastError = null;
        let validStoryboard = null;
        while (attempt <= maxZodRetries && !validStoryboard) {
            try {
                console.log(`[ScriptService] Requesting Storyboard from Gemini (Attempt ${attempt + 1})`);
                const response = await providers_1.geminiProvider.generateStructuredContent(userPrompt, {
                    systemInstruction: systemPrompt,
                    temperature: 0.7,
                    retries: 2 // Gemini internal network retries
                    // Not passing responseSchema here so we strictly rely on Zod parsing for structure enforcement
                });
                // 4. Validate output using Zod schemas
                console.log(`[ScriptService] Parsing Gemini output with Zod...`);
                validStoryboard = schemas_1.StoryboardSchema.parse(response.result);
                // TODO: Save to database (ScriptVersion) and JobLog
                await JobService_1.jobService.updateJobStatus(job.id, 'COMPLETED', 100);
                return validStoryboard;
            }
            catch (err) {
                attempt++;
                lastError = err;
                console.warn(`[ScriptService] Zod Validation Failed on attempt ${attempt}:`, err.message);
                // On failure, it will loop and ask Gemini again. (In a real app, we might pass the Zod error back to Gemini to fix it)
            }
        }
        await JobService_1.jobService.updateJobStatus(job.id, 'FAILED', 100);
        throw new Error(`Failed to generate a valid Storyboard after ${maxZodRetries} attempts. Last Error: ${lastError?.message}`);
    }
}
exports.ScriptService = ScriptService;
exports.scriptService = new ScriptService();
