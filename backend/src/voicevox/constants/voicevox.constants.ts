export const HTTP_TIMEOUT_MS = 60 * 1000; // 60 seconds

export const VOICEVOX_ENDPOINTS = {
  SPEAKERS: "/speakers",
  AUDIO_QUERY: "/audio_query",
  SYNTHESIS: "/synthesis",
} as const;

export const DEFAULT_AUDIO_QUERY_OPTIONS = {
  speedScale: 1.0,
  pitchScale: 0.0,
  intonationScale: 1.0,
  volumeScale: 1.0,
  prePhonemeLength: 0.1,
  postPhonemeLength: 0.1,
  pauseLengthScale: 1.0,
  outputSamplingRate: 24000,
  outputStereo: false,
} as const;

export const DEFAULT_STYLE_ID = 3;
