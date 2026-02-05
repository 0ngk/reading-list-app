import { Body, Controller, Get, Post } from "@nestjs/common";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation.pipe";
import { ArticleService } from "./article.service";
import type {
  CreateArticleDto,
  CreateArticleResponseDto,
  GetArticlesResponseDto,
} from "./shemas/article.shema";
import { createArticleSchema } from "./shemas/article.shema";
@Controller("articles")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getArticles(): Promise<GetArticlesResponseDto> {
    return this.articleService.getArticles();
  }

  @Post()
  async createArticle(
    @Body(new ZodValidationPipe(createArticleSchema))
    createArticleDto: CreateArticleDto,
  ): Promise<CreateArticleResponseDto> {
    return this.articleService.createArticle(createArticleDto);
  }
}
