"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitationEngine = exports.Ranking = exports.Normalizer = exports.Extractor = exports.Crawler = exports.SearchEngine = void 0;
class SearchEngine {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    async execute(query) { return this.provider.search(query); }
}
exports.SearchEngine = SearchEngine;
class Crawler {
    async fetchUrls(urls) { return urls.map(u => ({ url: u, html: "<html>...</html>" })); }
}
exports.Crawler = Crawler;
class Extractor {
    extractText(html) { return "Extracted text"; }
}
exports.Extractor = Extractor;
class Normalizer {
    normalize(text) { return text.trim().toLowerCase(); }
}
exports.Normalizer = Normalizer;
class Ranking {
    rankData(data) { return data.sort(); }
}
exports.Ranking = Ranking;
class CitationEngine {
    buildCitations(data) { return data.map(d => ({ source: "url", text: d })); }
}
exports.CitationEngine = CitationEngine;
