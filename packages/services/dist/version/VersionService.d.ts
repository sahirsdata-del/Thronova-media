export interface ResearchVersionData {
    id: string;
    ideaId: string;
    versionNumber: number;
    summary: string;
    rawJson: any;
    confidenceScore: number;
    lastUpdated: Date;
}
export declare class VersionService {
    saveVersion(ideaId: string, rawJson: any, summary: string, confidenceScore: number): Promise<ResearchVersionData>;
    getVersions(ideaId: string): Promise<ResearchVersionData[]>;
    getVersion(versionId: string): Promise<ResearchVersionData | null>;
}
export declare const versionService: VersionService;
