"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeService = exports.ThemeService = void 0;
class ThemeService {
    async getThemes() {
        return [
            { id: "dark-tech", name: "Dark Tech", primaryColor: "#3b82f6", secondaryColor: "#1d4ed8", fontFamily: "Inter", bgStyle: "Grid" },
            { id: "neon", name: "Neon Glow", primaryColor: "#ec4899", secondaryColor: "#8b5cf6", fontFamily: "Roboto", bgStyle: "Dark" },
            { id: "apple", name: "Apple Style", primaryColor: "#000000", secondaryColor: "#ffffff", fontFamily: "San Francisco", bgStyle: "Minimal" }
        ];
    }
}
exports.ThemeService = ThemeService;
exports.themeService = new ThemeService();
