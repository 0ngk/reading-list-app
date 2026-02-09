import { Module } from "@nestjs/common";
import { LlmService } from "src/llm/llm.service.js";
import { ScraperModule } from "../scraper/scraper.module.js";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";

@Module({
  imports: [ScraperModule],
  controllers: [ArticleController],
  providers: [ArticleService, LlmService],
})
export class ArticleModule {}
