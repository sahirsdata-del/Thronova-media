export class CompositionEngine {
  build(storyboard: any) { return { composition: true }; }
}

export class AssetResolver {
  async resolve(composition: any) { return { ...composition, assets: [] }; }
}

export class TimelineBuilder {
  build(assets: any) { return { timeline: true }; }
}

export class AnimationEngine {
  animate(timeline: any) { return { animated: true }; }
}

export class RemotionWrapper {
  async render(animation: any) { return "/tmp/raw.mp4"; }
}

export class FFmpegProcessor {
  async process(rawPath: string) { return "/tmp/final.mp4"; }
}
