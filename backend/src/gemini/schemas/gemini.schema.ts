import { z } from "zod";

export const generateSchema = z
  .object({
    prompt: z.string().min(1),
  })
  .strict();

export const generateResponseSchema = z
  .object({
    text: z.string(),
  })
  .strict();

export type GenerateDto = z.infer<typeof generateSchema>;
export type GenerateResponseDto = z.infer<typeof generateResponseSchema>;
