import { Test, TestingModule } from "@nestjs/testing";
import { OpenAiService } from "./open-ai.service";

describe("OpenAiService", () => {
  let service: OpenAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenAiService],
    }).compile();

    service = module.get<OpenAiService>(OpenAiService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
