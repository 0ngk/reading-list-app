import { Module } from "@nestjs/common";
import { LlmModule } from "src/llm/llm.module";
import { ScraperModule } from "../scraper/scraper.module";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";

@Module({
  imports: [ScraperModule, LlmModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
