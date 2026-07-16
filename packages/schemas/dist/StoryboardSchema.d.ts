import { z } from "zod";
export declare const SceneAssetNeededSchema: z.ZodObject<{
    type: z.ZodEnum<["IMAGE", "VIDEO", "AUDIO", "VECTOR"]>;
    description: z.ZodString;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "IMAGE" | "VIDEO" | "AUDIO" | "VECTOR";
    description: string;
    tags?: string[] | undefined;
}, {
    type: "IMAGE" | "VIDEO" | "AUDIO" | "VECTOR";
    description: string;
    tags?: string[] | undefined;
}>;
export declare const CaptionSchema: z.ZodObject<{
    text: z.ZodString;
    startTime: z.ZodNumber;
    endTime: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    text: string;
    startTime: number;
    endTime: number;
}, {
    text: string;
    startTime: number;
    endTime: number;
}>;
export declare const SceneSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["TITLE", "SPECS", "MEDIA"]>;
    duration: z.ZodNumber;
    visualPrompt: z.ZodString;
    narration: z.ZodString;
    captions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        startTime: z.ZodNumber;
        endTime: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        text: string;
        startTime: number;
        endTime: number;
    }, {
        text: string;
        startTime: number;
        endTime: number;
    }>, "many">>;
    assetsNeeded: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["IMAGE", "VIDEO", "AUDIO", "VECTOR"]>;
        description: z.ZodString;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "IMAGE" | "VIDEO" | "AUDIO" | "VECTOR";
        description: string;
        tags?: string[] | undefined;
    }, {
        type: "IMAGE" | "VIDEO" | "AUDIO" | "VECTOR";
        description: string;
        tags?: string[] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "TITLE" | "SPECS" | "MEDIA";
    id: string;
    duration: number;
    visualPrompt: string;
    narration: string;
    assetsNeeded: {
        type: "IMAGE" | "VIDEO" | "AUDIO" | "VECTOR";
        description: string;
        tags?: string[] | undefined;
    }[];
    captions?: {
        text: string;
        startTime: number;
        endTime: number;
    }[] | undefined;
}, {
    type: "TITLE" | "SPECS" | "MEDIA";
    id: string;
    duration: number;
    visualPrompt: string;
    narration: string;
    assetsNeeded: {
        type: "IMAGE" | "VIDEO" | "AUDIO" | "VECTOR";
        description: string;
        tags?: string[] | undefined;
    }[];
    captions?: {
        text: string;
        startTime: number;
        endTime: number;
    }[] | undefined;
}>;
export declare const StoryboardSchema: z.ZodObject<{
    title: z.ZodString;
    hook: z.ZodString;
    intro: z.ZodString;
    scenes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["TITLE", "SPECS", "MEDIA"]>;
        duration: z.ZodNumber;
        visualPrompt: z.ZodString;
        narration: z.ZodString;
        captions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            startTime: z.ZodNumber;
            endTime: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            text: string;
            startTime: number;
            endTime: number;
        }, {
            text: string;
            startTime: number;
            endTime: number;
        }>, "many">>;
        assetsNeeded: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["IMAGE", "VIDEO", "AUDIO", "VECTOR"]>;
            description: z.ZodString;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            type: "IMAGE" | "VIDEO" | "AUDIO" | "VECTOR";
            description: string;
            tags?: string[] | undefined;
        }, {
            type: "IMAGE" | "VIDEO" | "AUDIO" | "VECTOR";
            description: string;
            tags?: string[] | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "TITLE" | "SPECS" | "MEDIA";
        id: string;
        duration: number;
        visualPrompt: string;
        narration: string;
        assetsNeeded: {
            type: "IMAGE" | "VIDEO" | "AUDIO" | "VECTOR";
            description: string;
            tags?: string[] | undefined;
        }[];
        captions?: {
            text: string;
            startTime: number;
            endTime: number;
        }[] | undefined;
    }, {
        type: "TITLE" | "SPECS" | "MEDIA";
        id: string;
        duration: number;
        visualPrompt: string;
        narration: string;
        assetsNeeded: {
            type: "IMAGE" | "VIDEO" | "AUDIO" | "VECTOR";
            description: string;
            tags?: string[] | undefined;
        }[];
        captions?: {
            text: string;
            startTime: number;
            endTime: number;
        }[] | undefined;
    }>, "many">;
    cta: z.ZodString;
    description: z.ZodString;
    thumbnailIdeas: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    description: string;
    title: string;
    hook: string;
    intro: string;
    scenes: {
        type: "TITLE" | "SPECS" | "MEDIA";
        id: string;
        duration: number;
        visualPrompt: string;
        narration: string;
        assetsNeeded: {
            type: "IMAGE" | "VIDEO" | "AUDIO" | "VECTOR";
            description: string;
            tags?: string[] | undefined;
        }[];
        captions?: {
            text: string;
            startTime: number;
            endTime: number;
        }[] | undefined;
    }[];
    cta: string;
    thumbnailIdeas: string[];
}, {
    description: string;
    title: string;
    hook: string;
    intro: string;
    scenes: {
        type: "TITLE" | "SPECS" | "MEDIA";
        id: string;
        duration: number;
        visualPrompt: string;
        narration: string;
        assetsNeeded: {
            type: "IMAGE" | "VIDEO" | "AUDIO" | "VECTOR";
            description: string;
            tags?: string[] | undefined;
        }[];
        captions?: {
            text: string;
            startTime: number;
            endTime: number;
        }[] | undefined;
    }[];
    cta: string;
    thumbnailIdeas: string[];
}>;
export type Storyboard = z.infer<typeof StoryboardSchema>;
export type Scene = z.infer<typeof SceneSchema>;
