"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemotionRunner = void 0;
const bundler_1 = require("@remotion/bundler");
const renderer_1 = require("@remotion/renderer");
const path_1 = __importDefault(require("path"));
class RemotionRunner {
    async bundleAndRender({ entryPoint, compositionId, outputDir, jobId, storyboard, onProgress }) {
        const mp4Path = path_1.default.resolve(outputDir, `${jobId}.mp4`);
        const thumbPath = path_1.default.resolve(outputDir, `${jobId}_thumb.jpeg`);
        // Bundle the Remotion Project
        console.log(`[RemotionRunner] Bundling Remotion project at ${entryPoint}...`);
        const bundleLocation = await (0, bundler_1.bundle)({
            entryPoint,
            webpackOverride: (config) => config, // Customize if needed
        });
        // Calculate Composition Details
        const composition = await (0, renderer_1.selectComposition)({
            serveUrl: bundleLocation,
            id: compositionId,
            inputProps: storyboard,
        });
        // Render Thumbnail
        console.log(`[RemotionRunner] Rendering Thumbnail...`);
        await (0, renderer_1.renderStill)({
            composition,
            serveUrl: bundleLocation,
            output: thumbPath,
            inputProps: storyboard,
            frame: Math.floor(composition.durationInFrames / 2),
        });
        // Render MP4 Video
        console.log(`[RemotionRunner] Rendering MP4...`);
        await (0, renderer_1.renderMedia)({
            composition,
            serveUrl: bundleLocation,
            codec: "h264",
            outputLocation: mp4Path,
            inputProps: storyboard,
            onProgress: ({ progress }) => {
                onProgress(progress);
            }
        });
        return { videoPath: mp4Path, thumbPath: thumbPath };
    }
}
exports.RemotionRunner = RemotionRunner;
