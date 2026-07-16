export interface UploadMetadata {
  title: string;
  description: string;
  tags: string[];
  thumbnailUrl?: string;
  playlistId?: string;
  visibility: "public" | "private" | "unlisted";
  // Meta Specific
  targetPlatform?: "YOUTUBE" | "INSTAGRAM" | "FACEBOOK";
  metaFormat?: "REEL" | "STORY" | "POST";
  userId: string;
}

export interface UploadResult {
  platformVideoId: string;
  url: string;
  status: "PROCESSING" | "PUBLISHED" | "FAILED";
}

export interface IUploadProvider {
  platformName: string;
  uploadVideo(filePath: string, metadata: UploadMetadata, onProgress?: (progress: number) => void): Promise<UploadResult>;
}
