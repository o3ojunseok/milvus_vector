import { Injectable } from "@nestjs/common";
import { MilvusService } from "src/milvus/milvus.service";

@Injectable()
export class ChatService {
  constructor(
    private readonly milvusService: MilvusService,
  ) {}

  async vectorSearchChat(vector: number[]) {
    await this.milvusService.vectorSearch("test", vector);
  }
}
