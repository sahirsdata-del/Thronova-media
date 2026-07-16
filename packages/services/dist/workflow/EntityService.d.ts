export interface TopicEntityData {
    category: string;
    priceRange?: string;
    intent: string;
    rawEntities: Record<string, any>;
}
export declare class EntityService {
    extractEntities(title: string, category: string): Promise<TopicEntityData>;
}
export declare const entityService: EntityService;
