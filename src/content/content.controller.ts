import { Body, Controller, Post } from "@nestjs/common";
import { ContentService } from "./content.service";
import { CreateContentDto } from "./dto/create-content.dto";

@Controller("content")
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
  ) {}

  @Post("/post")
  async createContent(@Body() createContentDto: CreateContentDto) {
    return await this.contentService.createContent(createContentDto);
  }
}
