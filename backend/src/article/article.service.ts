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
import { buildSummaryPrompt } from "./utils/article.util";

const MAX_CONTENT_LENGTH = 10000;

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
    const title = this.extractTitle(dto.text);
    let aiSummary = AI_SUMMARY_DEFAULT;

    try {
      const truncatedText = dto.text.slice(0, MAX_CONTENT_LENGTH);
      this.logger.debug(
        `Input text length: ${dto.text.length} characters (truncated to ${truncatedText.length})`,
      );
      const llmResponse = await this.llmService.generateText({
        prompt: buildSummaryPrompt(truncatedText),
      });
      aiSummary = llmResponse.text;
    } catch (error) {
      this.logger.warn(
        `AI summary generation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
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

  private extractTitle(text: string): string {
    // biome-ignore lint/suspicious/noControlCharactersInRegex: intentional control character removal
    const cleaned = text.replace(/[\x00-\x1f]/g, " ").trim();
    const firstLine = cleaned.split("\n")[0]?.trim() ?? "";
    const raw = firstLine.length > 0 ? firstLine : cleaned;
    return raw.slice(0, 50).trim() || "Untitled";
  }
}
