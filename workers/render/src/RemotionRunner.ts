import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import path from "path";
import { Storyboard } from "@thronova/schemas";
import { IRemotionRunner } from "@thronova/services";

export class RemotionRunner implements IRemotionRunner {
  async bundleAndRender({ entryPoint, compositionId, outputDir, jobId, storyboard, onProgress }: {
    entryPoint: string;
    compositionId: string;
    outputDir: string;
    jobId: string;
    storyboard: Storyboard;
    onProgress: (progress: number) => void;
  }) {
    const mp4Path = path.resolve(outputDir, `${jobId}.mp4`);
    const thumbPath = path.resolve(outputDir, `${jobId}_thumb.jpeg`);

    // Bundle the Remotion Project
    console.log(`[RemotionRunner] Bundling Remotion project at ${entryPoint}...`);
    const bundleLocation = await bundle({
      entryPoint,
      webpackOverride: (config) => config, // Customize if needed
    });

    // Calculate Composition Details
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compositionId,
      inputProps: storyboard,
    });

    // Render Thumbnail
    console.log(`[RemotionRunner] Rendering Thumbnail...`);
    await renderStill({
      composition,
      serveUrl: bundleLocation,
      output: thumbPath,
      inputProps: storyboard,
      frame: Math.floor(composition.durationInFrames / 2),
    });

    // Render MP4 Video
    console.log(`[RemotionRunner] Rendering MP4...`);
    await renderMedia({
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
