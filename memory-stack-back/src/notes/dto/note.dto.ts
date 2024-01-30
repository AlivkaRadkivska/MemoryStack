import { IsNotEmpty, MaxLength } from 'class-validator';
import { CategoryEntity } from 'src/categories/category.entity';

export class NoteDto {
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  category: CategoryEntity;

  @IsNotEmpty()
  date: Date;
}
