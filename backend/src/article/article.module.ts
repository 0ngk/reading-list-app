import { Module } from "@nestjs/common";
import { LlmModule } from "src/llm/llm.module";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";

@Module({
  imports: [LlmModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
