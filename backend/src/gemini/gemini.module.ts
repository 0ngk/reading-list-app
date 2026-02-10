import { GoogleGenAI } from "@google/genai";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "src/config/env.validation";
import { LLM_CLIENT } from "src/llm/llm.client";
import { GENAI } from "./constants/gemini.constants";
import { GeminiController } from "./gemini.controller";
export { GENAI };

import { GeminiService } from "./gemini.service";

@Module({
  providers: [
    {
      provide: GENAI,
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentVariables, true>) => {
        const apiKey = config.get("GEMINI_API_KEY", { infer: true });

        if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

        return new GoogleGenAI({ apiKey });
      },
    },
    GeminiService,
    {
      provide: LLM_CLIENT,
      useExisting: GeminiService,
    },
  ],
  controllers: [GeminiController],
  exports: [GENAI, GeminiService, LLM_CLIENT],
})
export class GeminiModule {}
