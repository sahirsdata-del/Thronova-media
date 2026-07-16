export interface CompositionConfig {
  id: string;
  fps: number;
  durationInFrames: number;
  width: number;
  height: number;
  scenes: any[];
}

export class CompositionService {
  async generateComposition(scriptVersionId: string): Promise<CompositionConfig> {
    // Mock conversion from script version to remotion props
    return {
      id: `comp-${Date.now()}`,
      fps: 30,
      durationInFrames: 30 * 60, // 60 seconds
      width: 1080,
      height: 1920,
      scenes: [
        { id: "scene-1", from: 0, to: 120, type: "Title", text: "Top 5 Phones" },
        { id: "scene-2", from: 120, to: 300, type: "Product", name: "Phone 1" }
      ]
    };
  }
}

export const compositionService = new CompositionService();
