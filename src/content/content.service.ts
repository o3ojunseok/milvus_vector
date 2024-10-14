import { Injectable } from "@nestjs/common";
import { CreateContentDto } from "./dto/create-content.dto";
import { Content } from "./content.entity";
import { ContentRepository } from "./content.repository";
import { UpdateContentDto } from "./dto/update-content.dto";

@Injectable()
export class ContentService {
  constructor(
    private readonly contentRepository: ContentRepository,
  ) {}

  async findAllContent() {
    return await this.contentRepository.findAll();
  }

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

  async updateContent(id: number, updateContentDto: UpdateContentDto) {
    const content = await this.findOneContent(id);
    if (updateContentDto) {
      content.answer = updateContentDto.answer;
      content.content = updateContentDto.content;
    }
    await this.contentRepository.updateContent(id, updateContentDto);
    return content;
  }
}
