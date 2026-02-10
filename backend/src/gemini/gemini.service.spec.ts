import { Test, TestingModule } from "@nestjs/testing";
import { GENAI } from "./constants/gemini.constants";
import { GeminiService } from "./gemini.service";

describe("GeminiService", () => {
  let service: GeminiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeminiService,
        {
          provide: GENAI,
          useValue: {
            models: {
              generateContent: jest.fn().mockResolvedValue({ text: "text" }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<GeminiService>(GeminiService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
