export interface CompositionConfig {
    id: string;
    fps: number;
    durationInFrames: number;
    width: number;
    height: number;
    scenes: any[];
}
export declare class CompositionService {
    generateComposition(scriptVersionId: string): Promise<CompositionConfig>;
}
export declare const compositionService: CompositionService;
