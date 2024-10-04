import { Injectable } from '@nestjs/common';
import { CreateMilvusDto } from './dto/create-milvus.dto';
import { UpdateMilvusDto } from './dto/update-milvus.dto';

@Injectable()
export class MilvusService {
  create(createMilvusDto: CreateMilvusDto) {
    return 'This action adds a new milvus';
  }

  findAll() {
    return `This action returns all milvus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} milvus`;
  }

  update(id: number, updateMilvusDto: UpdateMilvusDto) {
    return `This action updates a #${id} milvus`;
  }

  remove(id: number) {
    return `This action removes a #${id} milvus`;
  }
}
