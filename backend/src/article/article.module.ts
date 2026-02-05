import { Module } from "@nestjs/common";
import { ScraperModule } from "../scraper/scraper.module.js";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";

@Module({
  imports: [ScraperModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
