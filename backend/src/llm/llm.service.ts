import { Inject, Injectable } from "@nestjs/common";
import { LLM_CLIENT, type LlmClient } from "./llm.client";
import { GenerateTextDto, GenerateTextResponseDto } from "./schemas/llm.schema";

@Injectable()
export class LlmService {
  constructor(@Inject(LLM_CLIENT) private readonly client: LlmClient) {}

  async generateText(dto: GenerateTextDto): Promise<GenerateTextResponseDto> {
    return { text: await this.client.generateText(dto.prompt) };
  }

  async generateStructuredText<T>(
    prompt: string,
    responseSchema: unknown,
  ): Promise<T> {
    return this.client.generateStructuredText<T>(prompt, responseSchema);
  }
}
