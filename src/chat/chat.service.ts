import { Injectable } from "@nestjs/common";
import { MilvusService } from "src/milvus/milvus.service";
import { GptTypeRole, MessagesType, RoleType } from "src/open-ai/interface/interface";
import { OpenAiService } from "src/open-ai/open-ai.service";
import { ChatDto } from "./dto/chat.dto";

@Injectable()
export class ChatService {
  constructor(
    private readonly milvusService: MilvusService,
    private readonly openAiService: OpenAiService,
  ) {}

  private userMessages(text: string): MessagesType[] {
    return [
      {
        role: RoleType.user,
        content: text,
      }
    ];
  }

  async vectorSearchChat(chatDto: ChatDto): Promise<any | string> {
    const embedding = await this.openAiService.embedding([chatDto.text]);
    const search = await this.milvusService.vectorSearch("test", embedding);
    if (search.results[0].score < 0.7) {
      return search.results[0];
    } else {
      const messages = this.userMessages(chatDto.text);
      const response = await this.openAiService.gptChat(GptTypeRole.GPT_4O_MINI, messages)
      return response.choices[0].message.content;
    }
  }
}
