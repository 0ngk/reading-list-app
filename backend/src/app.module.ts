import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArticleModule } from "./article/article.module";
import { validate } from "./config/env.validation";
import { DatabaseModule } from "./database/database.module";
import { LlmModule } from "./llm/llm.module";
import { VoicevoxModule } from "./voicevox/voicevox.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validate,
    }),
    ArticleModule,
    DatabaseModule,
    LlmModule,
    VoicevoxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
