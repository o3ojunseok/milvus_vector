import { Module } from "@nestjs/common";
import { ContentService } from "./content.service";
import { ContentController } from "./content.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "./content.entity";
import { ContentRepository } from "./content.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([Content])
  ],
  controllers: [
    ContentController,
  ],
  providers: [
    ContentService,
    ContentRepository
  ],
})
export class ContentModule {}
