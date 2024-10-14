import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ContentService } from "./content.service";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";

@Controller("content")
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
  ) {}

  @Get()
  async findAllContent() {
    return await this.contentService.findAllContent();
  }

  @Post("/post")
  async createContent(@Body() createContentDto: CreateContentDto) {
    return await this.contentService.createContent(createContentDto);
  }

  @Post("/update/:id")
  async updateContent(@Param("id") id: number, updateContentDto: UpdateContentDto) {
    return await this.contentService.updateContent(id, updateContentDto);
  }
}
