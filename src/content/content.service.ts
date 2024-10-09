import { Injectable } from "@nestjs/common";
import { CreateContentDto } from "./dto/create-content.dto";
import { Content } from "./content.entity";
import { ContentRepository } from "./content.repository";

@Injectable()
export class ContentService {
  constructor(
    private readonly contentRepository: ContentRepository,
  ) {}

  async findOneContent(id: number) {
    return await this.contentRepository.findOneContent(id);
  }

  async createContent(createContentDto: CreateContentDto) {
    const content = new Content();
    content.content = createContentDto.content;
    content.answer = createContentDto.answer;

    await this.contentRepository.postContent(content);
    return content;
  }
}
