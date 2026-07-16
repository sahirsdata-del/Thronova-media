import { AbsoluteFill, Series, useVideoConfig } from "remotion";
import { Storyboard } from "@thronova/schemas";
import { TitleScene } from "./components/TitleScene";
import { SpecsScene } from "./components/SpecsScene";
import { MediaScene } from "./components/MediaScene";

export const MainVideo: React.FC<Storyboard> = (props) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill className="bg-black text-white justify-center items-center font-sans">
      <Series>
        {props.scenes.map((scene, index) => {
          const durationInFrames = Math.max(1, scene.duration * fps);
          
          return (
            <Series.Sequence key={scene.id} durationInFrames={durationInFrames}>
              {scene.type === "TITLE" && <TitleScene scene={scene} />}
              {scene.type === "SPECS" && <SpecsScene scene={scene} />}
              {scene.type === "MEDIA" && <MediaScene scene={scene} />}
              
              {/* Fallback for undefined types in legacy mock data */}
              {!scene.type && <TitleScene scene={scene} />}
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};
