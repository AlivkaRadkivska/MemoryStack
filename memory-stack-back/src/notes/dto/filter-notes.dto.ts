import { IsOptional, IsString } from 'class-validator';

export class FilterNotesDto {
  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
