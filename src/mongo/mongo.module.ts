import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { MongoController } from './mongo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatLog, ChatLogDocument } from './mongo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ChatLog.name,
        schema: ChatLogDocument,
      }
    ])
  ],
  controllers: [MongoController],
  providers: [MongoService],
})
export class MongoModule {}
