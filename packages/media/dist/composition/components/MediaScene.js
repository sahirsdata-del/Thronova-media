"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaScene = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const MediaScene = ({ scene }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { fps } = (0, remotion_1.useVideoConfig)();
    const durationInFrames = Math.max(1, scene.duration * fps);
    // Slow zoom effect (ken burns)
    const scale = (0, remotion_1.interpolate)(frame, [0, durationInFrames], [1, 1.1]);
    // Crossfade in
    const opacity = (0, remotion_1.interpolate)(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return ((0, jsx_runtime_1.jsxs)(remotion_1.AbsoluteFill, { className: "bg-black justify-center items-center", style: { opacity }, children: [(0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, { style: { transform: `scale(\${scale})` }, children: (0, jsx_runtime_1.jsx)(remotion_1.Img, { src: `https://picsum.photos/seed/\${scene.id}/1080/1920`, className: "w-full h-full object-cover opacity-60" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "z-10 flex flex-col items-center justify-center p-12 text-center bg-gradient-to-t from-black/80 via-black/40 to-transparent absolute inset-0", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-6xl font-bold text-white drop-shadow-2xl absolute bottom-64", children: scene.visualPrompt }), scene.narration && ((0, jsx_runtime_1.jsx)("div", { className: "text-3xl text-zinc-200 font-medium max-w-4xl absolute bottom-20 bg-black/60 p-6 rounded-2xl border border-zinc-800 backdrop-blur-md", children: scene.narration }))] })] }));
};
exports.MediaScene = MediaScene;
