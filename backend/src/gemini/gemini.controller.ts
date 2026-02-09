import { Body, Controller, Post } from "@nestjs/common";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation.pipe";
import { GeminiService } from "./gemini.service";
import {
  type GenerateDto,
  type GenerateResponseDto,
  generateSchema,
} from "./schemas/gemini.schema";

@Controller("gemini")
export class GeminiController {
  constructor(private readonly gemini: GeminiService) {}

  @Post("generate")
  async generate(
    @Body(new ZodValidationPipe(generateSchema)) body: GenerateDto,
  ): Promise<GenerateResponseDto> {
    return { text: await this.gemini.generateText(body.prompt) };
  }
}
