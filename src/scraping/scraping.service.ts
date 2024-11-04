import { Injectable } from '@nestjs/common';
import { CreateScrapingDto } from './dto/create-scraping.dto';
import { UpdateScrapingDto } from './dto/update-scraping.dto';

@Injectable()
export class ScrapingService {
  create(createScrapingDto: CreateScrapingDto) {
    return 'This action adds a new scraping';
  }

  findAll() {
    return `This action returns all scraping`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scraping`;
  }

  update(id: number, updateScrapingDto: UpdateScrapingDto) {
    return `This action updates a #${id} scraping`;
  }

  remove(id: number) {
    return `This action removes a #${id} scraping`;
  }
}
