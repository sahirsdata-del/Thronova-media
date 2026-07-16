import { ITTSProvider } from "./ITTSProvider";
import { edgeTTSProvider } from "./EdgeTTSProvider";
import { geminiTTSProvider } from "./GeminiTTSProvider";
import { elevenLabsProvider } from "./ElevenLabsProvider";
import { openAIProvider } from "./OpenAIProvider";
import { kokoroProvider } from "./KokoroProvider";
import { azureTTSProvider } from "./AzureTTSProvider";

export type VoiceProviderType = "EDGE" | "GEMINI" | "ELEVENLABS" | "OPENAI" | "KOKORO" | "AZURE";

export class VoiceEngine {
  private providers: Record<VoiceProviderType, ITTSProvider>;
  
  // Make Edge TTS the default
  private defaultProvider: VoiceProviderType = "EDGE";

  constructor() {
    this.providers = {
      "EDGE": edgeTTSProvider,
      "GEMINI": geminiTTSProvider,
      "ELEVENLABS": elevenLabsProvider,
      "OPENAI": openAIProvider,
      "KOKORO": kokoroProvider,
      "AZURE": azureTTSProvider
    };
  }

  getProvider(type?: VoiceProviderType): ITTSProvider {
    return this.providers[type || this.defaultProvider];
  }

  setDefaultProvider(type: VoiceProviderType) {
    this.defaultProvider = type;
  }
}

export const voiceEngine = new VoiceEngine();
