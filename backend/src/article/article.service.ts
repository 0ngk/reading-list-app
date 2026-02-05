import { Injectable, Logger } from "@nestjs/common";
import { ScraperService } from "../scraper/scraper.service.js";
import {
  CreateArticleDto,
  CreateArticleResponseDto,
  GetArticlesResponseDto,
} from "./shemas/article.shema";

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);

  constructor(private readonly scraperService: ScraperService) {}

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
    let title = "Untitled";
    let aiSummary = "要約を取得できませんでした。";

    try {
      const result = await this.scraperService.scrape(dto.originalUrl);
      title = result.title || title;
      const scrapedSummary =
        result.excerpt || result.textContent.slice(0, 500);
      if (scrapedSummary) {
        aiSummary = scrapedSummary;
      }
    } catch (error) {
      this.logger.warn(
        `Scraping failed for ${dto.originalUrl}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    return {
      id: crypto.randomUUID(),
      title,
      originalUrl: dto.originalUrl,
      aiSummary,
    };
  }
}
