import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import type { EnvironmentVariables } from "../config/env.validation";
import {
  DEFAULT_STYLE_ID,
  VOICEVOX_ENDPOINTS,
} from "./constants/voicevox.constants";
import type {
  AudioQuery,
  AudioQueryOptions,
  Speaker,
  TextToSpeechOptions,
} from "./types/voicevox.types";

@Injectable()
export class VoicevoxService {
  private readonly logger = new Logger(VoicevoxService.name);
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {
    this.baseUrl =
      "http://" +
      this.configService.get("VOICEVOX_HOST", { infer: true }) +
      ":" +
      this.configService.get("VOICEVOX_PORT", { infer: true });
    this.logger.log(`VOICEVOX Engine URL: ${this.baseUrl}`);
  }

  async getSpeakers(): Promise<Speaker[]> {
    const response = await firstValueFrom(
      this.httpService.get<Speaker[]>(
        `${this.baseUrl}${VOICEVOX_ENDPOINTS.SPEAKERS}`,
      ),
    );
    return response.data;
  }

  private async createAudioQuery(
    text: string,
    styleId: number = DEFAULT_STYLE_ID,
  ): Promise<AudioQuery> {
    const response = await firstValueFrom(
      this.httpService.post<AudioQuery>(
        `${this.baseUrl}${VOICEVOX_ENDPOINTS.AUDIO_QUERY}`,
        null,
        { params: { text, speaker: styleId } },
      ),
    );
    return response.data;
  }

  private applyOptions(
    audioQuery: AudioQuery,
    options: AudioQueryOptions,
  ): AudioQuery {
    return {
      ...audioQuery,
      speedScale: options.speedScale ?? audioQuery.speedScale,
      pitchScale: options.pitchScale ?? audioQuery.pitchScale,
      intonationScale: options.intonationScale ?? audioQuery.intonationScale,
      volumeScale: options.volumeScale ?? audioQuery.volumeScale,
      prePhonemeLength: options.prePhonemeLength ?? audioQuery.prePhonemeLength,
      postPhonemeLength:
        options.postPhonemeLength ?? audioQuery.postPhonemeLength,
      pauseLengthScale: options.pauseLengthScale ?? audioQuery.pauseLengthScale,
      outputSamplingRate:
        options.outputSamplingRate ?? audioQuery.outputSamplingRate,
      outputStereo: options.outputStereo ?? audioQuery.outputStereo,
    };
  }

  private async synthesize(
    audioQuery: AudioQuery,
    styleId: number = DEFAULT_STYLE_ID,
    enableInterrogativeUpspeak?: boolean,
  ): Promise<Buffer> {
    const params: Record<string, number | boolean> = { speaker: styleId };
    if (typeof enableInterrogativeUpspeak === "boolean") {
      params.enable_interrogative_upspeak = enableInterrogativeUpspeak;
    }

    const response = await firstValueFrom(
      this.httpService.post(
        `${this.baseUrl}${VOICEVOX_ENDPOINTS.SYNTHESIS}`,
        audioQuery,
        {
          params,
          responseType: "arraybuffer",
          headers: { "Content-Type": "application/json" },
        },
      ),
    );
    return Buffer.from(response.data);
  }

  async textToSpeech(
    text: string,
    styleId: number = DEFAULT_STYLE_ID,
    options?: TextToSpeechOptions,
  ): Promise<Buffer> {
    let audioQuery = await this.createAudioQuery(text, styleId);

    if (options) {
      audioQuery = this.applyOptions(audioQuery, options);
    }

    return this.synthesize(
      audioQuery,
      styleId,
      options?.enableInterrogativeUpspeak,
    );
  }
}
