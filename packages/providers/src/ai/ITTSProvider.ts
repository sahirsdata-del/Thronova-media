export interface AudioResponse {
  audioBuffer: Buffer | null; // Null if mocked
  mockUrl?: string; // Used for UI preview if real generation is skipped
  durationSeconds: number;
  provider: string;
}

export interface TTSOptions {
  voiceId?: string;
  speed?: number;
  pitch?: number;
}

export interface ITTSProvider {
  providerName: string;
  generateAudio(text: string, options?: TTSOptions): Promise<AudioResponse>;
}
