import { Storyboard } from "@thronova/schemas";
export declare class ScriptService {
    generateScript(ideaId: string, researchData: any, tone: string, language: string): Promise<Storyboard>;
}
export declare const scriptService: ScriptService;
