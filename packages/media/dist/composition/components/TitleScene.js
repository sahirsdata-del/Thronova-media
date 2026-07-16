"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitleScene = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const TitleScene = ({ scene }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { fps } = (0, remotion_1.useVideoConfig)();
    // Spring animation for the title scaling in
    const scale = (0, remotion_1.spring)({
        fps,
        frame,
        config: { damping: 12, mass: 0.5 },
    });
    // Fade out transition at the end (last 15 frames)
    const durationInFrames = Math.max(1, scene.duration * fps);
    const opacity = (0, remotion_1.interpolate)(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return ((0, jsx_runtime_1.jsxs)(remotion_1.AbsoluteFill, { className: "bg-zinc-950 justify-center items-center text-center p-10", style: { opacity }, children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-zinc-950 to-zinc-950" }), (0, jsx_runtime_1.jsxs)("div", { style: { transform: `scale(\${scale})` }, className: "z-10 flex flex-col items-center gap-8", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 leading-tight", children: scene.visualPrompt }), scene.narration && ((0, jsx_runtime_1.jsx)("div", { className: "text-4xl text-zinc-400 font-medium max-w-4xl border-t border-zinc-800 pt-8 mt-4", children: scene.narration }))] })] }));
};
exports.TitleScene = TitleScene;
