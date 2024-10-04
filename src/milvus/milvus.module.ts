import { Module } from '@nestjs/common';
import { MilvusService } from './milvus.service';
import { MilvusController } from './milvus.controller';

@Module({
  controllers: [MilvusController],
  providers: [MilvusService],
})
export class MilvusModule {}
