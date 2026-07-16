export interface TemplateDefinition {
  name: string;
  colors: string[];
  fonts: string[];
  timing: {
    hookDuration: number;
    sceneDuration: number;
    outroDuration: number;
  };
}

export const TechReviewTemplate: TemplateDefinition = {
  name: "TechReview",
  colors: ["#1a1a2e", "#16213e", "#0f3460", "#e94560"],
  fonts: ["Inter", "Roboto"],
  timing: {
    hookDuration: 5,
    sceneDuration: 15,
    outroDuration: 5,
  }
};

export const Top5Template: TemplateDefinition = {
  name: "Top5",
  colors: ["#000000", "#14213d", "#fca311", "#e5e5e5"],
  fonts: ["Outfit"],
  timing: {
    hookDuration: 3,
    sceneDuration: 10,
    outroDuration: 4,
  }
};
