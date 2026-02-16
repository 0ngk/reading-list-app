import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./shared/filters/http-exception.filter";

const REQUEST_BODY_LIMIT = process.env.REQUEST_BODY_LIMIT ?? "1mb";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  app.useBodyParser("json", { limit: REQUEST_BODY_LIMIT });
  app.useBodyParser("urlencoded", {
    limit: REQUEST_BODY_LIMIT,
    extended: true,
  });

  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
