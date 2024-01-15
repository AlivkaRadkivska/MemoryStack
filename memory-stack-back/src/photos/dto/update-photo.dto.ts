import { IsOptional } from 'class-validator';
import { CategoryEntity } from 'src/categories/category.entity';

export class UpdatePhotoDto {
  @IsOptional()
  path: string;

  @IsOptional()
  caption: string;

  @IsOptional()
  category: CategoryEntity;

  @IsOptional()
  date: Date;
}
