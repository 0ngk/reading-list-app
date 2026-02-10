export interface Mora {
  text: string;
  consonant?: string;
  consonant_length?: number;
  vowel: string;
  vowel_length: number;
  pitch: number;
}

export interface AccentPhrase {
  moras: Mora[];
  accent: number;
  pause_mora?: Mora;
  is_interrogative?: boolean;
}

export interface AudioQuery {
  accent_phrases: AccentPhrase[];
  speedScale: number;
  pitchScale: number;
  intonationScale: number;
  volumeScale: number;
  prePhonemeLength: number;
  postPhonemeLength: number;
  pauseLength?: number;
  pauseLengthScale: number;
  outputSamplingRate: number;
  outputStereo: boolean;
  kana?: string;
}

export interface AudioQueryOptions {
  speedScale?: number;
  pitchScale?: number;
  intonationScale?: number;
  volumeScale?: number;
  prePhonemeLength?: number;
  postPhonemeLength?: number;
  pauseLengthScale?: number;
  outputSamplingRate?: number;
  outputStereo?: boolean;
}

export interface SpeakerStyle {
  name: string;
  id: number;
  type?: string;
}

export interface Speaker {
  name: string;
  speaker_uuid: string;
  styles: SpeakerStyle[];
  version?: string;
  supported_features?: SupportedFeatures;
}

export interface SupportedFeatures {
  permitted_synthesis_morphing?: "ALL" | "SELF_ONLY" | "NOTHING";
}

export interface TextToSpeechOptions extends AudioQueryOptions {
  enableInterrogativeUpspeak?: boolean;
}
