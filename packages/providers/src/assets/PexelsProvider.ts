import { IAssetProvider, DownloadedAsset } from "./IAssetProvider";

export class PexelsProvider implements IAssetProvider {
  providerName = "Pexels";
  supportedTypes: ("IMAGE" | "VIDEO" | "VECTOR")[] = ["IMAGE", "VIDEO"];

  async searchAndDownload(query: string, type: "IMAGE" | "VIDEO" | "VECTOR"): Promise<DownloadedAsset> {
    console.log(`[Pexels] Searching and downloading ${type}: ${query}`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const randomId = Math.floor(Math.random() * 1000).toString();
    
    // Mock video URL if requested, otherwise image
    const isVideo = type === "VIDEO";
    const fileUrl = isVideo 
      ? "https://www.w3schools.com/html/mov_bbb.mp4" 
      : `https://picsum.photos/id/${randomId}/1080/1920`;

    return {
      providerName: this.providerName,
      sourceId: `pexels-${randomId}`,
      fileUrl: fileUrl,
      thumbnailUrl: `https://picsum.photos/id/${randomId}/200/300`,
      type: isVideo ? "VIDEO" : "IMAGE",
      authorName: "Pexels Creator",
    };
  }
}

export const pexelsProvider = new PexelsProvider();
