import { z } from "zod";

export const SceneAssetNeededSchema = z.object({
  type: z.enum(["IMAGE", "VIDEO", "AUDIO", "VECTOR"]),
  description: z.string().describe("What exactly needs to be shown (e.g., 'Poco X6 Neo Front View')"),
  tags: z.array(z.string()).optional()
});

export const CaptionSchema = z.object({
  text: z.string(),
  startTime: z.number().describe("Start time in seconds within the scene"),
  endTime: z.number().describe("End time in seconds within the scene")
});

export const SceneSchema = z.object({
  id: z.string(),
  type: z.enum(["TITLE", "SPECS", "MEDIA"]).describe("The type of scene to render"),
  duration: z.number().describe("Duration of the scene in seconds"),
  visualPrompt: z.string().describe("Detailed visual instructions for the renderer/asset engine"),
  narration: z.string().describe("The script text to be spoken by AI Voice"),
  captions: z.array(CaptionSchema).optional(),
  assetsNeeded: z.array(SceneAssetNeededSchema)
});

export const StoryboardSchema = z.object({
  title: z.string(),
  hook: z.string().describe("The opening hook to grab attention (first 3-5 seconds)"),
  intro: z.string().describe("Setting the context"),
  scenes: z.array(SceneSchema),
  cta: z.string().describe("Call to action at the end"),
  description: z.string().describe("YouTube/Social description text with hashtags"),
  thumbnailIdeas: z.array(z.string()).describe("3 distinct visual ideas for thumbnails")
});

export type Storyboard = z.infer<typeof StoryboardSchema>;
export type Scene = z.infer<typeof SceneSchema>;
