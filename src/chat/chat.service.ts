import { Injectable } from "@nestjs/common";
import { MilvusService } from "src/milvus/milvus.service";
import { GptTypeRole, RoleType } from "src/open-ai/interface/interface";
import { OpenAiService } from "src/open-ai/open-ai.service";

@Injectable()
export class ChatService {
  constructor(
    private readonly milvusService: MilvusService,
    private readonly openAiService: OpenAiService,
  ) {}

  private userMessages(text: string) {
    return [
      {
        role: RoleType.user,
        content: text,
      }
    ];
  }

  async vectorSearchChat(text: string) {
    const embedding = await this.openAiService.embedding([text]);
    const search = await this.milvusService.vectorSearch("test", embedding.data[0].embedding);
    if (search.results[0].score < 0.7) {
      return search.results[0];
    } else {
      const messages = this.userMessages(text);
      return await this.openAiService.gptChat(GptTypeRole.GPT_4O_MINI, messages)
    }
  }
}
