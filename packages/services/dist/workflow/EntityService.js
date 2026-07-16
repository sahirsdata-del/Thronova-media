"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityService = exports.EntityService = void 0;
class EntityService {
    async extractEntities(title, category) {
        // Mock extraction
        return {
            category: category || "General",
            priceRange: title.includes("₹") ? "Specific Budget" : "Any",
            intent: title.toLowerCase().includes("vs") || title.toLowerCase().includes("compare") ? "Comparison" : "Review",
            rawEntities: {
                keywords: title.split(" "),
                detectedBrands: ["Apple", "Samsung"], // mock
            }
        };
    }
}
exports.EntityService = EntityService;
exports.entityService = new EntityService();
