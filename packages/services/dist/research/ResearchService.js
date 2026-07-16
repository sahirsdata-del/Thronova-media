"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.researchService = exports.ResearchService = void 0;
const JobService_1 = require("../workflow/JobService");
const VersionService_1 = require("../version/VersionService");
const EntityService_1 = require("../workflow/EntityService");
const providers_1 = require("@thronova/providers");
const generative_ai_1 = require("@google/generative-ai");
class ResearchService {
    async startResearch(ideaId, title, category, projectId) {
        // 1. Create a Job
        const job = await JobService_1.jobService.createJob('RESEARCH', projectId, { ideaId });
        // 2. Start running (mocking asynchronous processing)
        await JobService_1.jobService.updateJobStatus(job.id, 'RUNNING', 10);
        // 3. Extract entities
        const entities = await EntityService_1.entityService.extractEntities(title, category);
        await JobService_1.jobService.updateJobStatus(job.id, 'RUNNING', 40);
        // 4. Generate research via Gemini API
        const systemPrompt = `You are an expert content researcher. Research the following topic and provide comprehensive, structured JSON output. Provide references and trending keywords.`;
        const researchSchema = {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {
                topic: { type: generative_ai_1.SchemaType.STRING },
                summary: { type: generative_ai_1.SchemaType.STRING },
                sections: {
                    type: generative_ai_1.SchemaType.ARRAY,
                    items: {
                        type: generative_ai_1.SchemaType.OBJECT,
                        properties: {
                            title: { type: generative_ai_1.SchemaType.STRING },
                            content: { type: generative_ai_1.SchemaType.STRING }
                        },
                        required: ["title", "content"]
                    }
                },
                keywords: {
                    type: generative_ai_1.SchemaType.ARRAY,
                    items: { type: generative_ai_1.SchemaType.STRING }
                },
                references: {
                    type: generative_ai_1.SchemaType.ARRAY,
                    items: {
                        type: generative_ai_1.SchemaType.OBJECT,
                        properties: {
                            title: { type: generative_ai_1.SchemaType.STRING },
                            url: { type: generative_ai_1.SchemaType.STRING },
                            snippet: { type: generative_ai_1.SchemaType.STRING }
                        },
                        required: ["title", "url"]
                    }
                }
            },
            required: ["topic", "summary", "sections", "keywords", "references"]
        };
        let generatedOutput;
        try {
            const response = await providers_1.geminiProvider.generateStructuredContent(`Conduct deep research on: ${title} in the category: ${category}`, {
                systemInstruction: systemPrompt,
                temperature: 0.5,
                responseSchema: researchSchema,
                retries: 3
            });
            generatedOutput = response.result;
            // We could store response.metrics (tokens, duration) into the JobLog here
        }
        catch (e) {
            console.error("Failed to generate research via AI, falling back to mock", e);
            // Fallback for UI testing if API key fails
            generatedOutput = {
                topic: title,
                summary: `Comprehensive research on ${title}`,
                sections: [
                    { title: "Key Specifications", content: "Details..." },
                    { title: "Pros & Cons", content: "Details..." }
                ],
                keywords: ["tech", "review", category.toLowerCase()],
                references: [
                    { title: "Source 1", url: "https://example.com/1", snippet: "..." }
                ]
            };
        }
        await JobService_1.jobService.updateJobStatus(job.id, 'RUNNING', 90);
        // 5. Save Version
        const version = await VersionService_1.versionService.saveVersion(ideaId, generatedOutput, generatedOutput.summary, 0.95);
        // 6. Complete Job
        await JobService_1.jobService.updateJobStatus(job.id, 'COMPLETED', 100);
        return { job, version, entities };
    }
}
exports.ResearchService = ResearchService;
exports.researchService = new ResearchService();
