import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene } from "@thronova/schemas";

export const MediaScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = Math.max(1, scene.duration * fps);

  // Slow zoom effect (ken burns)
  const scale = interpolate(
    frame,
    [0, durationInFrames],
    [1, 1.1]
  );

  // Crossfade in
  const opacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-black justify-center items-center" style={{ opacity }}>
      {/* If we had a real asset bound, we would use it here. Using a placeholder based on scene ID. */}
      <AbsoluteFill style={{ transform: `scale(\${scale})` }}>
        <Img 
          src={`https://picsum.photos/seed/\${scene.id}/1080/1920`} 
          className="w-full h-full object-cover opacity-60"
        />
      </AbsoluteFill>

      {/* Overlay Text */}
      <div className="z-10 flex flex-col items-center justify-center p-12 text-center bg-gradient-to-t from-black/80 via-black/40 to-transparent absolute inset-0">
        <h2 className="text-6xl font-bold text-white drop-shadow-2xl absolute bottom-64">
          {scene.visualPrompt}
        </h2>
        
        {scene.narration && (
          <div className="text-3xl text-zinc-200 font-medium max-w-4xl absolute bottom-20 bg-black/60 p-6 rounded-2xl border border-zinc-800 backdrop-blur-md">
            {scene.narration}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
