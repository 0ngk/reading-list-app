import { Test, TestingModule } from "@nestjs/testing";
import { LLM_CLIENT } from "./llm.client";
import { LlmService } from "./llm.service";

describe("LlmService", () => {
  let service: LlmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LlmService,
        {
          provide: LLM_CLIENT,
          useValue: {
            generateText: jest.fn().mockResolvedValue("test"),
          },
        },
      ],
    }).compile();

    service = module.get<LlmService>(LlmService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
