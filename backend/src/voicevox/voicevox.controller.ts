import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import type { Response } from "express";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation.pipe";
import { DEFAULT_STYLE_ID } from "./constants/voicevox.constants";
import type {
  TextToSpeechOptionsDto,
  TextToSpeechQueryDto,
} from "./schemas/voicevox.schema";
import {
  textToSpeechOptionsSchema,
  textToSpeechQuerySchema,
} from "./schemas/voicevox.schema";
import { VoicevoxService } from "./voicevox.service";

@Controller("voicevox")
export class VoicevoxController {
  constructor(private readonly voicevoxService: VoicevoxService) {}

  @Get("speakers")
  async getSpeakers() {
    return this.voicevoxService.getSpeakers();
  }

  @Post("tts")
  @HttpCode(HttpStatus.OK)
  async textToSpeech(
    @Query(new ZodValidationPipe(textToSpeechQuerySchema))
    query: TextToSpeechQueryDto,
    @Body(new ZodValidationPipe(textToSpeechOptionsSchema.optional()))
    options: TextToSpeechOptionsDto | undefined,
    @Res() res: Response,
  ) {
    const id = query.styleId ?? DEFAULT_STYLE_ID;
    const wav = await this.voicevoxService.textToSpeech(
      query.text,
      id,
      options ?? undefined,
    );

    res.set({
      "Content-Type": "audio/wav",
      "Content-Length": wav.length,
    });
    res.send(wav);
  }
}
