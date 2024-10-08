import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Content } from "./content.entity";

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
}
