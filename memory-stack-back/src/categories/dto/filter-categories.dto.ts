import { IsOptional, IsString } from 'class-validator';

export class FilterCategoriesDto {
  @IsOptional()
  @IsString()
  search?: string;
}
