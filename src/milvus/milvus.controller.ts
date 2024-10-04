import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MilvusService } from './milvus.service';
import { CreateMilvusDto } from './dto/create-milvus.dto';
import { UpdateMilvusDto } from './dto/update-milvus.dto';

@Controller('milvus')
export class MilvusController {
  constructor(private readonly milvusService: MilvusService) {}

  @Post()
  create(@Body() createMilvusDto: CreateMilvusDto) {
    return this.milvusService.create(createMilvusDto);
  }

  @Get()
  findAll() {
    return this.milvusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.milvusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMilvusDto: UpdateMilvusDto) {
    return this.milvusService.update(+id, updateMilvusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.milvusService.remove(+id);
  }
}
