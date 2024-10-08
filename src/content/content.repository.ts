import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Content } from "./content.entity";

@Injectable()
export class ProjectRepository extends Repository<Content> {
  constructor(private dataSource: DataSource) {
    super(Content, dataSource.createEntityManager());
  }
}
