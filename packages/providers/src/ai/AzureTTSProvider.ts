import { ITTSProvider, TTSOptions, AudioResponse } from "./ITTSProvider";

export class AzureTTSProvider implements ITTSProvider {
  providerName = "Azure";
  async generateAudio(text: string, options?: TTSOptions): Promise<AudioResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    return { audioBuffer: null, mockUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", durationSeconds: 2, provider: this.providerName };
  }
}
export const azureTTSProvider = new AzureTTSProvider();
