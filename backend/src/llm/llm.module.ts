import { Module } from "@nestjs/common";
import { GeminiModule } from "src/gemini/gemini.module";
import { LlmService } from "./llm.service";

@Module({
  imports: [GeminiModule],
  providers: [LlmService],
  exports: [LlmService],
})
export class LlmModule {}
