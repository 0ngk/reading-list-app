import { z } from "zod";

export const generateTextSchema = z
  .object({
    prompt: z.string().min(1),
  })
  .strict();

export const generateTextResponseSchema = z
  .object({
    text: z.string(),
  })
  .strict();

export type GenerateTextDto = z.infer<typeof generateTextSchema>;
export type GenerateTextResponseDto = z.infer<
  typeof generateTextResponseSchema
>;
