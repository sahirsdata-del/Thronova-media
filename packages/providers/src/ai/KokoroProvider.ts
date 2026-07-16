import { ITTSProvider, TTSOptions, AudioResponse } from "./ITTSProvider";

export class KokoroProvider implements ITTSProvider {
  providerName = "Kokoro";
  async generateAudio(text: string, options?: TTSOptions): Promise<AudioResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    return { audioBuffer: null, mockUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", durationSeconds: 2, provider: this.providerName };
  }
}
export const kokoroProvider = new KokoroProvider();
