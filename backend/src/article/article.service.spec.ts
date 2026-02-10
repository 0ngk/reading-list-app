import { Test, TestingModule } from "@nestjs/testing";
import { LlmService } from "../llm/llm.service";
import { ArticleService } from "./article.service";

jest.mock("../scraper/scraper.service", () => {
  return {
    ScraperService: jest.fn().mockImplementation(() => ({
      scrape: jest.fn().mockResolvedValue({
        title: "Test Title",
        textContent: "Test content",
        excerpt: "Test excerpt",
        siteName: null,
      }),
    })),
  };
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ScraperService } = require("../scraper/scraper.service");

describe("ArticleService", () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: ScraperService,
          useValue: new ScraperService(),
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
