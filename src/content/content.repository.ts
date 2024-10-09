import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Content } from "./content.entity";
import { CreateContentDto } from "./dto/create-content.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ContentRepository extends Repository<Content> {
  constructor(private dataSource: DataSource) {
    super(Content, dataSource.createEntityManager());
  }

  async findAll() {
    return await this.find();
  }

  async findOneContent(id: number) {
    return await this.findOne({
      where: { id },
    });
  }

  async postContent(createContentDto: CreateContentDto) {
    const content: Content = plainToInstance(Content, createContentDto);
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(createContentDto);
      await queryRunner.commitTransaction();
      return content;
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

}
