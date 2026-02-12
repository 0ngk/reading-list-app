import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation.pipe";
import { ArticleService } from "./article.service";
import type {
  ArticleResponseDto,
  CreateArticleDto,
  CreateArticleResponseDto,
  GetArticlesResponseDto,
} from "./schemas/article.schema";
import { createArticleSchema } from "./schemas/article.schema";

@Controller("articles")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getArticles(): Promise<GetArticlesResponseDto> {
    return this.articleService.getArticles();
  }

  @Get(":id")
  async getArticleById(
    @Param("id") id: string,
  ): Promise<ArticleResponseDto> {
    return this.articleService.getArticleById(id);
  }

  @Post()
  async createArticle(
    @Body(new ZodValidationPipe(createArticleSchema))
    createArticleDto: CreateArticleDto,
  ): Promise<CreateArticleResponseDto> {
    return this.articleService.createArticle(createArticleDto);
  }
}
