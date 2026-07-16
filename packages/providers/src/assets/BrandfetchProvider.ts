import { IAssetProvider, DownloadedAsset } from "./IAssetProvider";

export class BrandfetchProvider implements IAssetProvider {
  providerName = "Brandfetch";
  supportedTypes: ("IMAGE" | "VIDEO" | "VECTOR")[] = ["IMAGE", "VECTOR"];

  async searchAndDownload(query: string, type: "IMAGE" | "VIDEO" | "VECTOR"): Promise<DownloadedAsset> {
    console.log(`[Brandfetch] Searching and downloading logo for: ${query}`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock brandfetch API logic, e.g. finding logo for a domain
    const cleanQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    return {
      providerName: this.providerName,
      sourceId: `brandfetch-${cleanQuery}`,
      fileUrl: `https://logo.clearbit.com/${cleanQuery}.com`, // using clearbit for free demo
      thumbnailUrl: `https://logo.clearbit.com/${cleanQuery}.com`,
      type: "IMAGE", // Simplified to image for now
      authorName: `${query} Brand`,
    };
  }
}

export const brandfetchProvider = new BrandfetchProvider();
