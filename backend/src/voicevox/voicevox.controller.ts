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
import { DEFAULT_STYLE_ID } from "./constants/voicevox.constants";
import type { TextToSpeechOptions } from "./types/voicevox.types";
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
    @Query("text") text: string,
    @Query("styleId") styleId: string | undefined,
    @Body() options: TextToSpeechOptions | undefined,
    @Res() res: Response,
  ) {
    const id = styleId ? Number.parseInt(styleId, 10) : DEFAULT_STYLE_ID;
    if (styleId && Number.isNaN(id)) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: "styleId must be a number",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const wav = await this.voicevoxService.textToSpeech(
      text,
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
