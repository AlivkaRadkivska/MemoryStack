import { IsNotEmpty } from 'class-validator';
import { CategoryEntity } from 'src/categories/category.entity';

export class AddPhotoDto {
  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  caption: string;

  @IsNotEmpty()
  category: CategoryEntity;

  @IsNotEmpty()
  date: Date;
}
