import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { StoryboardSchema } from "@thronova/schemas";
import { z } from "zod";
import "../app/globals.css"; // Ensure tailwind works in remotion if needed

// We define a default prop shape for previewing in the Remotion Studio
const defaultProps: z.infer<typeof StoryboardSchema> = {
  title: "Test Video",
  hook: "Watch this hook",
  intro: "Here is the intro",
  cta: "Subscribe!",
  description: "Desc",
  thumbnailIdeas: [],
  scenes: [
    {
      id: "s1",
      type: "TITLE",
      duration: 5,
      visualPrompt: "Show a title",
      narration: "Hello world",
      assetsNeeded: []
    }
  ]
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={300} // This will be calculated dynamically based on inputProps in real runs
        fps={30}
        width={1080}
        height={1920}
        schema={StoryboardSchema}
        defaultProps={defaultProps as any}
      />
    </>
  );
};
