import { z } from "zod";

export const articleSchema = z
  .object({
    id: z.uuid(),
    title: z.string().min(1).max(255),
    originalUrl: z.url(),
    aiSummary: z.string().min(1),
  })
  .strict();

export const createArticleSchema = articleSchema
  .omit({
    id: true,
    title: true,
    aiSummary: true,
  })
  .strict();

export type GetArticlesResponseDto = z.infer<typeof articleSchema>[];
export type CreateArticleDto = z.infer<typeof createArticleSchema>;
export type CreateArticleResponseDto = z.infer<typeof articleSchema>;
