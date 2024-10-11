import { PartialType } from '@nestjs/mapped-types';
import { CreateContentDto } from './create-content.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateContentDto extends PartialType(CreateContentDto) {
  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  answer: string;
}
