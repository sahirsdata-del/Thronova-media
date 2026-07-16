export interface TopicEntityData {
  category: string;
  priceRange?: string;
  intent: string;
  rawEntities: Record<string, any>;
}

export class EntityService {
  async extractEntities(title: string, category: string): Promise<TopicEntityData> {
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

export const entityService = new EntityService();
