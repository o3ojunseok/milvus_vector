import { Body, Controller, Post } from "@nestjs/common";
import { OpenAiService } from "./open-ai.service";
import { GptTypeRole, MessagesType } from "./interface/interface";

@Controller("open-ai")
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post()
  async gptChat(@Body() messages: MessagesType[]) {
    return await this.openAiService.gptChat(GptTypeRole.GPT_4O_MINI, messages);
  }
}
