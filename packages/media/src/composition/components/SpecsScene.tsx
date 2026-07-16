import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene } from "@thronova/schemas";

export const SpecsScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide in from bottom
  const translateY = spring({
    fps,
    frame,
    from: 1000,
    to: 0,
    config: { damping: 14 },
  });

  // Extract specs from visual prompt (Assuming comma or newline separated for this template)
  const specs = scene.visualPrompt.split(/[,\n]/).filter(s => s.trim().length > 0);

  return (
    <AbsoluteFill className="bg-zinc-900 justify-center items-center p-16">
      <div 
        className="w-full max-w-4xl bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-12 shadow-2xl flex flex-col gap-8"
        style={{ transform: `translateY(\${translateY}px)` }}
      >
        <h2 className="text-6xl font-bold text-white mb-4 border-b border-zinc-800 pb-8">
          Key Specifications
        </h2>
        
        <div className="flex flex-col gap-6">
          {specs.map((spec, index) => {
            // Staggered fade in for each spec
            const opacity = interpolate(
              frame - (index * 10), 
              [0, 15], 
              [0, 1], 
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            
            return (
              <div key={index} className="flex items-center gap-6 text-4xl text-zinc-300" style={{ opacity }}>
                <div className="h-4 w-4 rounded-full bg-purple-500" />
                {spec.trim()}
              </div>
            );
          })}
        </div>

        {scene.narration && (
          <div className="absolute -bottom-32 left-0 right-0 text-3xl text-center text-zinc-400 bg-black/50 p-6 rounded-2xl border border-zinc-800">
            {scene.narration}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
