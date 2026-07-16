"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainVideo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const TitleScene_1 = require("./components/TitleScene");
const SpecsScene_1 = require("./components/SpecsScene");
const MediaScene_1 = require("./components/MediaScene");
const MainVideo = (props) => {
    const { fps } = (0, remotion_1.useVideoConfig)();
    return ((0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, { className: "bg-black text-white justify-center items-center font-sans", children: (0, jsx_runtime_1.jsx)(remotion_1.Series, { children: props.scenes.map((scene, index) => {
                const durationInFrames = Math.max(1, scene.duration * fps);
                return ((0, jsx_runtime_1.jsxs)(remotion_1.Series.Sequence, { durationInFrames: durationInFrames, children: [scene.type === "TITLE" && (0, jsx_runtime_1.jsx)(TitleScene_1.TitleScene, { scene: scene }), scene.type === "SPECS" && (0, jsx_runtime_1.jsx)(SpecsScene_1.SpecsScene, { scene: scene }), scene.type === "MEDIA" && (0, jsx_runtime_1.jsx)(MediaScene_1.MediaScene, { scene: scene }), !scene.type && (0, jsx_runtime_1.jsx)(TitleScene_1.TitleScene, { scene: scene })] }, scene.id));
            }) }) }));
};
exports.MainVideo = MainVideo;
