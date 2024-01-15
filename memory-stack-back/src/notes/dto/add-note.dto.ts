import { IsNotEmpty } from 'class-validator';
import { CategoryEntity } from 'src/categories/category.entity';

export class AddNoteDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  category: CategoryEntity;

  @IsNotEmpty()
  date: Date;
}
