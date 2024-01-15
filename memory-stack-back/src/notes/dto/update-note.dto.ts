import { IsOptional } from 'class-validator';
import { CategoryEntity } from 'src/categories/category.entity';

export class UpdateNoteDto {
  @IsOptional()
  title: string;

  @IsOptional()
  content: string;

  @IsOptional()
  category: CategoryEntity;

  @IsOptional()
  date: Date;
}
