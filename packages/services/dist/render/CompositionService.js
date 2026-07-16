"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compositionService = exports.CompositionService = void 0;
class CompositionService {
    async generateComposition(scriptVersionId) {
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
exports.CompositionService = CompositionService;
exports.compositionService = new CompositionService();
