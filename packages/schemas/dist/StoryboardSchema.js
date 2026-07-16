"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryboardSchema = exports.SceneSchema = exports.CaptionSchema = exports.SceneAssetNeededSchema = void 0;
const zod_1 = require("zod");
exports.SceneAssetNeededSchema = zod_1.z.object({
    type: zod_1.z.enum(["IMAGE", "VIDEO", "AUDIO", "VECTOR"]),
    description: zod_1.z.string().describe("What exactly needs to be shown (e.g., 'Poco X6 Neo Front View')"),
    tags: zod_1.z.array(zod_1.z.string()).optional()
});
exports.CaptionSchema = zod_1.z.object({
    text: zod_1.z.string(),
    startTime: zod_1.z.number().describe("Start time in seconds within the scene"),
    endTime: zod_1.z.number().describe("End time in seconds within the scene")
});
exports.SceneSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.enum(["TITLE", "SPECS", "MEDIA"]).describe("The type of scene to render"),
    duration: zod_1.z.number().describe("Duration of the scene in seconds"),
    visualPrompt: zod_1.z.string().describe("Detailed visual instructions for the renderer/asset engine"),
    narration: zod_1.z.string().describe("The script text to be spoken by AI Voice"),
    captions: zod_1.z.array(exports.CaptionSchema).optional(),
    assetsNeeded: zod_1.z.array(exports.SceneAssetNeededSchema)
});
exports.StoryboardSchema = zod_1.z.object({
    title: zod_1.z.string(),
    hook: zod_1.z.string().describe("The opening hook to grab attention (first 3-5 seconds)"),
    intro: zod_1.z.string().describe("Setting the context"),
    scenes: zod_1.z.array(exports.SceneSchema),
    cta: zod_1.z.string().describe("Call to action at the end"),
    description: zod_1.z.string().describe("YouTube/Social description text with hashtags"),
    thumbnailIdeas: zod_1.z.array(zod_1.z.string()).describe("3 distinct visual ideas for thumbnails")
});
