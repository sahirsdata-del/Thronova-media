export interface DownloadedAsset {
  providerName: string;
  sourceId: string; // The ID from the provider (e.g. Unsplash Photo ID)
  fileUrl: string; // The mocked or real URL of the downloaded asset
  thumbnailUrl?: string; // Small preview
  type: "IMAGE" | "VIDEO" | "VECTOR";
  authorName?: string;
  authorUrl?: string;
}

export interface IAssetProvider {
  providerName: string;
  supportedTypes: ("IMAGE" | "VIDEO" | "VECTOR")[];
  searchAndDownload(query: string, type: "IMAGE" | "VIDEO" | "VECTOR"): Promise<DownloadedAsset>;
}
