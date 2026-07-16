import { IAssetProvider, DownloadedAsset } from "./IAssetProvider";

export class UnsplashProvider implements IAssetProvider {
  providerName = "Unsplash";
  supportedTypes: ("IMAGE" | "VIDEO" | "VECTOR")[] = ["IMAGE"];

  async searchAndDownload(query: string, type: "IMAGE" | "VIDEO" | "VECTOR"): Promise<DownloadedAsset> {
    console.log(`[Unsplash] Searching and downloading: ${query}`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Mock network

    // Fallback to picsum for demo if no API key is provided
    const randomId = Math.floor(Math.random() * 1000).toString();
    const url = `https://picsum.photos/id/${randomId}/1080/1920`;

    return {
      providerName: this.providerName,
      sourceId: `unsplash-${randomId}`,
      fileUrl: url,
      thumbnailUrl: url,
      type: "IMAGE",
      authorName: "Unsplash Creator",
    };
  }
}

export const unsplashProvider = new UnsplashProvider();
