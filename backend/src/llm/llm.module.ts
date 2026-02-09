import { Module } from "@nestjs/common";
import { GeminiService } from "src/gemini/gemini.service";
import { LlmService } from "./llm.service";

@Module({
  providers: [LlmService, GeminiService],
})
export class LlmModule {}
