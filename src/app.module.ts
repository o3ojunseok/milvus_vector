import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MilvusModule } from './milvus/milvus.module';

@Module({
  imports: [MilvusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
