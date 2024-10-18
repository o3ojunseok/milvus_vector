import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { MilvusService } from "src/milvus/milvus.service";
import { OpenAiService } from "src/open-ai/open-ai.service";

@Module({
  controllers: [ChatController],
  providers: [
    ChatService,
    MilvusService,
    OpenAiService,
  ],
})
export class ChatModule {}
