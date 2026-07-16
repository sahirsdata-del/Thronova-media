import { IAssetProvider } from "./IAssetProvider";
import { unsplashProvider } from "./UnsplashProvider";
import { pexelsProvider } from "./PexelsProvider";
import { brandfetchProvider } from "./BrandfetchProvider";

export class AssetEngine {
  private providers: IAssetProvider[];

  constructor() {
    this.providers = [
      unsplashProvider,
      pexelsProvider,
      brandfetchProvider,
    ];
  }

  getProviderForType(type: "IMAGE" | "VIDEO" | "VECTOR", query: string): IAssetProvider {
    // If the query looks like a logo request, prioritize Brandfetch
    if (query.toLowerCase().includes("logo") || query.toLowerCase().includes("brand")) {
       return brandfetchProvider;
    }

    // Otherwise, find a provider that supports the requested type
    // In a real app, this might involve load balancing or API quota checks
    const supportedProviders = this.providers.filter(p => p.supportedTypes.includes(type));
    
    if (supportedProviders.length === 0) {
      throw new Error(`No asset provider found for type: ${type}`);
    }

    // Default strategy: For videos use Pexels, for images use Unsplash
    if (type === "VIDEO") return pexelsProvider;
    return unsplashProvider;
  }
}

export const assetEngine = new AssetEngine();
