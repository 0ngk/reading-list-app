import { Injectable } from "@nestjs/common";
import {
  CreateArticleDto,
  CreateArticleResponseDto,
  GetArticlesResponseDto,
} from "./shemas/article.shema";

@Injectable()
export class ArticleService {
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
    return {
      id: "generated-uuid",
      title: "Generated Title",
      originalUrl: dto.originalUrl,
      aiSummary: "This is an AI-generated summary.",
    };
  }
}
