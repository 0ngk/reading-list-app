export const LLM_CLIENT = Symbol("LLM_CLIENT");

export interface LlmClient {
  generateText(prompt: string): Promise<string>;
  generateStructuredText<T>(
    prompt: string,
    responseSchema: unknown,
  ): Promise<T>;
}
