import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { LlmService } from "../llm/llm.service";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { Article } from "./entities/article.entity";

describe("ArticleController", () => {
  let controller: ArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(Article),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest.fn().mockImplementation((entity) =>
              Promise.resolve({ id: "test-uuid", ...entity }),
            ),
          },
        },
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
