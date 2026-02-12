import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { LlmService } from "../llm/llm.service";
import { ArticleService } from "./article.service";
import { Article } from "./entities/article.entity";

describe("ArticleService", () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ArticleService>(ArticleService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
