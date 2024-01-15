import { IsOptional, IsString } from 'class-validator';

export class FilterPhotosDto {
  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
