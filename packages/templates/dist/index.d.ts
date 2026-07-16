export interface TemplateDefinition {
    name: string;
    colors: string[];
    fonts: string[];
    timing: {
        hookDuration: number;
        sceneDuration: number;
        outroDuration: number;
    };
}
export declare const TechReviewTemplate: TemplateDefinition;
export declare const Top5Template: TemplateDefinition;
