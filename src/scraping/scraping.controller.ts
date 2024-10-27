import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { CreateScrapingDto } from './dto/create-scraping.dto';
import { UpdateScrapingDto } from './dto/update-scraping.dto';

@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}
}
