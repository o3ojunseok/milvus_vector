import { Body, Controller, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatDto } from "./dto/chat.dto";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async vectorSearchChat(@Body() chatDto: ChatDto) {
    return await this.chatService.vectorSearchChat(chatDto);
  }
}
