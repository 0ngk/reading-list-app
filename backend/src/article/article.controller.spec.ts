import { Test, TestingModule } from "@nestjs/testing";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";

jest.mock("../scraper/scraper.service", () => {
  return {
    ScraperService: jest.fn().mockImplementation(() => ({
      scrape: jest.fn(),
    })),
  };
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ScraperService } = require("../scraper/scraper.service");

describe("ArticleController", () => {
  let controller: ArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        ArticleService,
        {
          provide: ScraperService,
          useValue: new ScraperService(),
        },
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
