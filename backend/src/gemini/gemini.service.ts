import { GoogleGenAI } from "@google/genai";
import { Inject, Injectable } from "@nestjs/common";
import { GENAI, MODEL_NAME } from "./constants/gemini.constants";

@Injectable()
export class GeminiService {
  constructor(@Inject(GENAI) private readonly ai: GoogleGenAI) {}

  async generateText(prompt: string): Promise<string> {
    const res = await this.ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return res.text ?? "";
  }
}
