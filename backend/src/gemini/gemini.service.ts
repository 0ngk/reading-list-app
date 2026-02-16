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

  async generateStructuredText<T>(
    prompt: string,
    responseSchema: unknown,
  ): Promise<T> {
    const res = await this.ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    if (!res.text) {
      throw new Error("Empty response from Gemini API");
    }

    return JSON.parse(res.text) as T;
  }
}
