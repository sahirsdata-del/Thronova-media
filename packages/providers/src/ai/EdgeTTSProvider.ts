import { ITTSProvider, TTSOptions, AudioResponse } from "./ITTSProvider";

export class EdgeTTSProvider implements ITTSProvider {
  providerName = "EdgeTTS";

  async generateAudio(text: string, options?: TTSOptions): Promise<AudioResponse> {
    console.log(`[EdgeTTSProvider] Generating audio for text length: ${text.length}`);
    
    // Default mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    const wordCount = text.split(" ").length;
    const estimatedDuration = (wordCount / 150) * 60;

    return {
      audioBuffer: null, 
      mockUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      durationSeconds: parseFloat(estimatedDuration.toFixed(2)),
      provider: this.providerName
    };
  }
}

export const edgeTTSProvider = new EdgeTTSProvider();
