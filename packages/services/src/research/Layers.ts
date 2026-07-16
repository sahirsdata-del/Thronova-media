export interface SearchProvider {
  search(query: string): Promise<any[]>;
}

export class SearchEngine {
  constructor(private provider: SearchProvider) {}
  async execute(query: string) { return this.provider.search(query); }
}

export class Crawler {
  async fetchUrls(urls: string[]) { return urls.map(u => ({ url: u, html: "<html>...</html>" })); }
}

export class Extractor {
  extractText(html: string) { return "Extracted text"; }
}

export class Normalizer {
  normalize(text: string) { return text.trim().toLowerCase(); }
}

export class Ranking {
  rankData(data: any[]) { return data.sort(); }
}

export class CitationEngine {
  buildCitations(data: any[]) { return data.map(d => ({ source: "url", text: d })); }
}
