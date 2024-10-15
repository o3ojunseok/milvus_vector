import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MilvusService } from 'src/milvus/milvus.service';

@Module({
  controllers: [ChatController],
  providers: [
    ChatService,
    MilvusService,
  ],
})
export class ChatModule {}
