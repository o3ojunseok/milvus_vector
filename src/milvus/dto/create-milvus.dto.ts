import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateMilvusDto {
  @IsNumber()
  id: number;

  @IsArray()
  vector: number[];

  @IsString()
  content: string;
}
