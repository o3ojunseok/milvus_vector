import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MilvusModule } from "./milvus/milvus.module";
import { OpenAiModule } from "./open-ai/open-ai.module";

@Module({
  imports: [MilvusModule, OpenAiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
