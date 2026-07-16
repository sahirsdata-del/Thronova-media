"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateService = exports.TemplateService = void 0;
class TemplateService {
    async getHookTemplates() {
        return [
            { id: "1", text: "Don't buy a {{product}} before watching this!", category: "Review" },
            { id: "2", text: "You won't believe what happens when...", category: "Entertainment" },
            { id: "3", text: "The best {{category}} in {{year}} is finally here.", category: "Tech" },
        ];
    }
    async getCTATemplates() {
        return [
            { id: "1", text: "Subscribe for more daily tech reviews.", category: "YouTube" },
            { id: "2", text: "Comment your favorite below!", category: "Engagement" },
            { id: "3", text: "Link in bio to check it out.", category: "Instagram" },
        ];
    }
}
exports.TemplateService = TemplateService;
exports.templateService = new TemplateService();
