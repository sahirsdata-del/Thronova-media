"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemotionRoot = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const MainVideo_1 = require("./MainVideo");
const schemas_1 = require("@thronova/schemas");
require("../app/globals.css"); // Ensure tailwind works in remotion if needed
// We define a default prop shape for previewing in the Remotion Studio
const defaultProps = {
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
const RemotionRoot = () => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "MainVideo", component: MainVideo_1.MainVideo, durationInFrames: 300, fps: 30, width: 1080, height: 1920, schema: schemas_1.StoryboardSchema, defaultProps: defaultProps }) }));
};
exports.RemotionRoot = RemotionRoot;
