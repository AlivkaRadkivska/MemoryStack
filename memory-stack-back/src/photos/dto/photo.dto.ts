import { IsNotEmpty } from 'class-validator';
import { CategoryEntity } from 'src/categories/category.entity';

export class PhotoDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  caption: string;

  @IsNotEmpty()
  category: CategoryEntity;

  @IsNotEmpty()
  date: Date;
}
