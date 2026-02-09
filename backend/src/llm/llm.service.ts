import { Injectable } from "@nestjs/common";
import { GeminiService } from "src/gemini/gemini.service";
import { GenerateResponseDto } from "src/gemini/schemas/gemini.schema";
import { GenerateTextDto } from "./schemas/llm.schema";

@Injectable()
export class LlmService {
  constructor(private readonly geminiSercive: GeminiService) {}

  async generateText(dto: GenerateTextDto): Promise<GenerateResponseDto> {
    return { text: await this.geminiSercive.generateText(dto.prompt) };
  }
}
