import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LlmModule } from "src/llm/llm.module";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { Article } from "./entities/article.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Article]), LlmModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
