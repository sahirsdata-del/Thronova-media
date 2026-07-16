export interface SearchProvider {
    search(query: string): Promise<any[]>;
}
export declare class SearchEngine {
    private provider;
    constructor(provider: SearchProvider);
    execute(query: string): Promise<any[]>;
}
export declare class Crawler {
    fetchUrls(urls: string[]): Promise<{
        url: string;
        html: string;
    }[]>;
}
export declare class Extractor {
    extractText(html: string): string;
}
export declare class Normalizer {
    normalize(text: string): string;
}
export declare class Ranking {
    rankData(data: any[]): any[];
}
export declare class CitationEngine {
    buildCitations(data: any[]): {
        source: string;
        text: any;
    }[];
}
