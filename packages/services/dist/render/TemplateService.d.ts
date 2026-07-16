export declare class TemplateService {
    getHookTemplates(): Promise<{
        id: string;
        text: string;
        category: string;
    }[]>;
    getCTATemplates(): Promise<{
        id: string;
        text: string;
        category: string;
    }[]>;
}
export declare const templateService: TemplateService;
