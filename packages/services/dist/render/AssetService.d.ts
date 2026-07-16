export interface AssetData {
    id: string;
    title: string;
    type: string;
    url: string;
    thumbnailUrl?: string;
    category?: string;
    license?: string;
    resolution?: string;
    sizeBytes?: number;
    tags: string[];
}
export declare class AssetService {
    private assetCache;
    downloadSceneAssets(projectId: string, sceneId: string, requirements: {
        type: "IMAGE" | "VIDEO" | "VECTOR";
        description: string;
    }[]): Promise<AssetData[]>;
    getAssets(): Promise<AssetData[]>;
    getFolders(): Promise<{
        id: string;
        name: string;
    }[]>;
}
export declare const assetService: AssetService;
