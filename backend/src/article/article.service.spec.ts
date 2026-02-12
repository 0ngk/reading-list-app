import { Test, TestingModule } from "@nestjs/testing";
import { LlmService } from "../llm/llm.service";
import { ArticleService } from "./article.service";

describe("ArticleService", () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ArticleService>(ArticleService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
