export interface ThemeConfig {
    id: string;
    name: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    bgStyle: string;
}
export declare class ThemeService {
    getThemes(): Promise<ThemeConfig[]>;
}
export declare const themeService: ThemeService;
