import { Type } from "@google/genai";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LlmService } from "src/llm/llm.service";
import type { Repository } from "typeorm";
import { AI_SUMMARY_DEFAULT } from "./constants/article.constant";
import { Article } from "./entities/article.entity";
import type {
  ArticleResponseDto,
  CreateArticleDto,
  CreateArticleResponseDto,
  GetArticlesResponseDto,
} from "./schemas/article.schema";
import { buildTitleAndSummaryPrompt } from "./utils/article.util";

const MAX_CONTENT_LENGTH = 10000;

interface AiGeneratedContent {
  title: string;
  summary: { emoji: string; text: string }[];
}

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);

  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly llmService: LlmService,
  ) {}

  async getArticleById(id: string): Promise<ArticleResponseDto> {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return {
      id: article.id,
      title: article.title,
      originalUrl: article.originalUrl ?? undefined,
      aiSummary: article.aiSummary,
    };
  }

  async getArticles(): Promise<GetArticlesResponseDto> {
    const articles = await this.articleRepository.find({
      order: { createdAt: "DESC" },
    });
    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      originalUrl: article.originalUrl ?? undefined,
      aiSummary: article.aiSummary,
    }));
  }

  async createArticle(
    dto: CreateArticleDto,
  ): Promise<CreateArticleResponseDto> {
    let title = "無題の記事"; // デフォルトのタイトル
    let aiSummary = AI_SUMMARY_DEFAULT;

    try {
      const truncatedText = dto.text.slice(0, MAX_CONTENT_LENGTH);
      this.logger.debug(
        `Input text length: ${dto.text.length} characters (truncated to ${truncatedText.length})`,
      );

      // レスポンススキーマを定義
      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "記事のタイトル(50文字以内)",
          },
          summary: {
            type: Type.ARRAY,
            description: "バズりやすいショート動画の台本（文ごとに分割）",
            items: {
              type: Type.OBJECT,
              properties: {
                emoji: {
                  type: Type.STRING,
                  description: "文の内容を表す絵文字1つ",
                },
                text: {
                  type: Type.STRING,
                  description: "台本の1文",
                },
              },
              required: ["emoji", "text"],
              propertyOrdering: ["emoji", "text"],
            },
          },
        },
        required: ["title", "summary"],
        propertyOrdering: ["title", "summary"],
      };

      // タイトルとサマリーを1回のAPI呼び出しで生成
      const generated =
        await this.llmService.generateStructuredText<AiGeneratedContent>(
          buildTitleAndSummaryPrompt(truncatedText),
          responseSchema,
        );

      // タイトルの検証と切り詰め（DB制約: 1-255文字）
      const rawTitle = generated.title?.trim() || "";
      if (rawTitle.length > 0) {
        title = rawTitle.slice(0, 255); // DBの最大長
      }

      aiSummary =
        generated.summary?.length > 0 ? generated.summary : AI_SUMMARY_DEFAULT;
    } catch (error) {
      this.logger.warn(
        `AI generation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
      // title と aiSummary は既にデフォルト値が設定されている
    }

    const article = this.articleRepository.create({
      title,
      originalUrl: dto.originalUrl ?? null,
      aiSummary,
    });
    const saved = await this.articleRepository.save(article);

    return {
      id: saved.id,
      title: saved.title,
      originalUrl: saved.originalUrl ?? undefined,
      aiSummary: saved.aiSummary,
    };
  }
}
