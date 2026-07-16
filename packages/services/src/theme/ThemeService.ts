export interface ThemeConfig {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  bgStyle: string;
}

export class ThemeService {
  async getThemes(): Promise<ThemeConfig[]> {
    return [
      { id: "dark-tech", name: "Dark Tech", primaryColor: "#3b82f6", secondaryColor: "#1d4ed8", fontFamily: "Inter", bgStyle: "Grid" },
      { id: "neon", name: "Neon Glow", primaryColor: "#ec4899", secondaryColor: "#8b5cf6", fontFamily: "Roboto", bgStyle: "Dark" },
      { id: "apple", name: "Apple Style", primaryColor: "#000000", secondaryColor: "#ffffff", fontFamily: "San Francisco", bgStyle: "Minimal" }
    ];
  }
}

export const themeService = new ThemeService();
