export interface IAssetConnector {
    providerName: string;
    search(query: string, options?: any): Promise<any[]>;
    download(assetId: string): Promise<string>;
    getMetadata(assetId: string): Promise<any>;
}
export declare class UnsplashConnector implements IAssetConnector {
    providerName: string;
    search(query: string): Promise<never[]>;
    download(id: string): Promise<string>;
    getMetadata(id: string): Promise<{}>;
}
export declare class SearchService {
    private connectors;
    globalSearch(query: string): Promise<{
        id: string;
        title: string;
        source: string;
    }[]>;
}
export declare const searchService: SearchService;
