"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFmpegProcessor = exports.RemotionWrapper = exports.AnimationEngine = exports.TimelineBuilder = exports.AssetResolver = exports.CompositionEngine = void 0;
class CompositionEngine {
    build(storyboard) { return { composition: true }; }
}
exports.CompositionEngine = CompositionEngine;
class AssetResolver {
    async resolve(composition) { return { ...composition, assets: [] }; }
}
exports.AssetResolver = AssetResolver;
class TimelineBuilder {
    build(assets) { return { timeline: true }; }
}
exports.TimelineBuilder = TimelineBuilder;
class AnimationEngine {
    animate(timeline) { return { animated: true }; }
}
exports.AnimationEngine = AnimationEngine;
class RemotionWrapper {
    async render(animation) { return "/tmp/raw.mp4"; }
}
exports.RemotionWrapper = RemotionWrapper;
class FFmpegProcessor {
    async process(rawPath) { return "/tmp/final.mp4"; }
}
exports.FFmpegProcessor = FFmpegProcessor;
