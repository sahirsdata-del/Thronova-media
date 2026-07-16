"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecsScene = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const SpecsScene = ({ scene }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { fps } = (0, remotion_1.useVideoConfig)();
    // Slide in from bottom
    const translateY = (0, remotion_1.spring)({
        fps,
        frame,
        from: 1000,
        to: 0,
        config: { damping: 14 },
    });
    // Extract specs from visual prompt (Assuming comma or newline separated for this template)
    const specs = scene.visualPrompt.split(/[,\n]/).filter(s => s.trim().length > 0);
    return ((0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, { className: "bg-zinc-900 justify-center items-center p-16", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-4xl bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-12 shadow-2xl flex flex-col gap-8", style: { transform: `translateY(\${translateY}px)` }, children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-6xl font-bold text-white mb-4 border-b border-zinc-800 pb-8", children: "Key Specifications" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-6", children: specs.map((spec, index) => {
                        // Staggered fade in for each spec
                        const opacity = (0, remotion_1.interpolate)(frame - (index * 10), [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-6 text-4xl text-zinc-300", style: { opacity }, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-4 rounded-full bg-purple-500" }), spec.trim()] }, index));
                    }) }), scene.narration && ((0, jsx_runtime_1.jsx)("div", { className: "absolute -bottom-32 left-0 right-0 text-3xl text-center text-zinc-400 bg-black/50 p-6 rounded-2xl border border-zinc-800", children: scene.narration }))] }) }));
};
exports.SpecsScene = SpecsScene;
