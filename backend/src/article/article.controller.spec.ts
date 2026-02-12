import { Test, TestingModule } from "@nestjs/testing";
import { LlmService } from "../llm/llm.service";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";

describe("ArticleController", () => {
  let controller: ArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        ArticleService,
        {
          provide: LlmService,
          useValue: {
            generateText: jest.fn().mockResolvedValue({ text: "summary" }),
          },
        },
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
