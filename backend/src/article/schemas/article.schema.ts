import { z } from "zod";

const httpUrlSchema = z
  .url()
  .refine((url) => url.startsWith("http://") || url.startsWith("https://"), {
    message: "http または https のURLのみ許可されています",
  });

export const articleSchema = z
  .object({
    id: z.uuid(),
    title: z.string().min(1).max(255),
    originalUrl: z.url().optional(),
    aiSummary: z.string().min(1),
  })
  .strict();

export const createArticleSchema = z
  .object({
    text: z.string().trim().min(1).max(50000),
    originalUrl: httpUrlSchema.optional(),
  })
  .strict();

export type ArticleResponseDto = z.infer<typeof articleSchema>;
export type GetArticlesResponseDto = ArticleResponseDto[];
export type CreateArticleDto = z.infer<typeof createArticleSchema>;
export type CreateArticleResponseDto = ArticleResponseDto;
