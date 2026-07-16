import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene } from "@thronova/schemas";

export const TitleScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for the title scaling in
  const scale = spring({
    fps,
    frame,
    config: { damping: 12, mass: 0.5 },
  });

  // Fade out transition at the end (last 15 frames)
  const durationInFrames = Math.max(1, scene.duration * fps);
  const opacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-zinc-950 justify-center items-center text-center p-10" style={{ opacity }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-zinc-950 to-zinc-950" />
      
      <div style={{ transform: `scale(\${scale})` }} className="z-10 flex flex-col items-center gap-8">
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 leading-tight">
          {scene.visualPrompt}
        </h1>
        {scene.narration && (
          <div className="text-4xl text-zinc-400 font-medium max-w-4xl border-t border-zinc-800 pt-8 mt-4">
            {scene.narration}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
