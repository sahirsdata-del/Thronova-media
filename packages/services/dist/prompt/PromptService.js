"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptService = exports.PromptService = void 0;
class PromptService {
    async getTemplate(id) {
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
    async createTemplate(data) {
        return {
            id: `prompt-${Date.now()}`,
            version: 1,
            ...data
        };
    }
}
exports.PromptService = PromptService;
exports.promptService = new PromptService();
