import { ProviderConfig } from "@thronova/config";
import { IUploadProvider, UploadMetadata, UploadResult } from "./IUploadProvider";
import { google } from "googleapis";
import { IStorageProvider } from "../storage/IStorageProvider";
import { prisma } from "@thronova/database";

export class YouTubeProvider implements IUploadProvider {
  platformName = "YouTube";

  constructor(private storageProvider: IStorageProvider) {}

  async uploadVideo(filePath: string, metadata: UploadMetadata, onProgress?: (progress: number) => void): Promise<UploadResult> {
    console.log(`[YouTubeProvider] Preparing to upload ${filePath}...`);

    // OAuth2 Setup
    const clientId = ProviderConfig.YOUTUBE_CLIENT_ID;
    const clientSecret = ProviderConfig.YOUTUBE_CLIENT_SECRET;
    const redirectUrl = ProviderConfig.YOUTUBE_REDIRECT_URL;

    if (!clientId || !clientSecret || !metadata.userId) {
      console.warn("[YouTubeProvider] Missing OAuth credentials or userId. Mocking upload process.");
      return this.mockUpload(metadata, onProgress);
    }

    const account = await prisma.account.findFirst({
      where: { userId: metadata.userId, provider: "google" }
    });

    const refreshToken = account?.refresh_token;

    if (!refreshToken) {
      console.warn("[YouTubeProvider] User has not connected YouTube. Mocking upload process.");
      return this.mockUpload(metadata, onProgress);
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const youtube = google.youtube({ version: "v3", auth: oauth2Client });

    try {
      const fileSize = await this.storageProvider.getFileSize(filePath);
      const res = await youtube.videos.insert({
        part: ["snippet", "status"],
        requestBody: {
          snippet: {
            title: metadata.title,
            description: metadata.description,
            tags: metadata.tags,
            categoryId: "28", // Science & Technology
          },
          status: {
            privacyStatus: metadata.visibility,
          },
        },
        media: {
          body: this.storageProvider.createReadStream(filePath),
        },
      }, {
        onUploadProgress: (evt) => {
          const progress = (evt.bytesRead / fileSize) * 100;
          if (onProgress) onProgress(progress);
        },
      });

      const videoId = res.data.id!;
      
      // If a thumbnail is provided, upload it as well
      if (metadata.thumbnailUrl && await this.storageProvider.exists(metadata.thumbnailUrl)) {
         await youtube.thumbnails.set({
           videoId,
           media: {
             body: this.storageProvider.createReadStream(metadata.thumbnailUrl)
           }
         });
      }

      return {
        platformVideoId: videoId,
        url: `https://youtube.com/watch?v=${videoId}`,
        status: "PROCESSING"
      };

    } catch (error: any) {
      console.error("[YouTubeProvider] Upload failed:", error);
      throw error;
    }
  }

  private async mockUpload(metadata: UploadMetadata, onProgress?: (progress: number) => void): Promise<UploadResult> {
    // Simulate chunked upload
    for (let i = 1; i <= 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (onProgress) onProgress(i * 10);
    }
    
    const randomId = Math.random().toString(36).substring(7);
    return {
      platformVideoId: randomId,
      url: `https://youtube.com/watch?v=${randomId}`,
      status: "PUBLISHED"
    };
  }
}
