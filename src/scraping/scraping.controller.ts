import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { CreateScrapingDto } from './dto/create-scraping.dto';
import { UpdateScrapingDto } from './dto/update-scraping.dto';

@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Post()
  create(@Body() createScrapingDto: CreateScrapingDto) {
    return this.scrapingService.create(createScrapingDto);
  }

  @Get()
  findAll() {
    return this.scrapingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scrapingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScrapingDto: UpdateScrapingDto) {
    return this.scrapingService.update(+id, updateScrapingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scrapingService.remove(+id);
  }
}
