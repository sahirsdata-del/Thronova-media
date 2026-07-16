export declare class CompositionEngine {
    build(storyboard: any): {
        composition: boolean;
    };
}
export declare class AssetResolver {
    resolve(composition: any): Promise<any>;
}
export declare class TimelineBuilder {
    build(assets: any): {
        timeline: boolean;
    };
}
export declare class AnimationEngine {
    animate(timeline: any): {
        animated: boolean;
    };
}
export declare class RemotionWrapper {
    render(animation: any): Promise<string>;
}
export declare class FFmpegProcessor {
    process(rawPath: string): Promise<string>;
}
