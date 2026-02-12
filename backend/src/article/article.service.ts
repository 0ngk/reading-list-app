import { Injectable, Logger } from "@nestjs/common";
import { LlmService } from "src/llm/llm.service";
import { AI_SUMMARY_DEFAULT } from "./constants/article.constant";
import {
  CreateArticleDto,
  CreateArticleResponseDto,
  GetArticlesResponseDto,
} from "./schemas/article.schema";
import { buildSummaryPrompt } from "./utils/article.util";

const MAX_CONTENT_LENGTH = 10000;

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);

  constructor(private readonly llmService: LlmService) {}

  async getArticles(): Promise<GetArticlesResponseDto> {
    return [
      {
        id: "",
        title: "First Article",
        originalUrl: "http://example.com/first-article",
        aiSummary: "This is the content of the first article.",
      },
      {
        id: "",
        title: "Second Article",
        originalUrl: "http://example.com/second-article",
        aiSummary: "This is the content of the second article.",
      },
    ];
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

    return {
      id: crypto.randomUUID(),
      title,
      originalUrl: dto.originalUrl,
      aiSummary,
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
