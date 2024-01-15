import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/auth/user.entity';
import { CategoryEntity } from './category.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
@UseGuards(AuthGuard())
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(@GetUser() user: UserEntity): Promise<CategoryEntity[]> {
    return this.categoriesService.getAll(user);
  }

  @Get('/:id')
  getCategoryById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<CategoryEntity> {
    return this.categoriesService.getOneById(id, user);
  }

  @Post()
  addCategory(
    @Body('name') name: string,
    @GetUser() user: UserEntity,
  ): Promise<CategoryEntity> {
    return this.categoriesService.addOne(name, user);
  }

  @Patch('/:id')
  updatecategoryById(
    @Param('id') id: string,
    @Body('name') name: string,
    @GetUser() user: UserEntity,
  ): Promise<CategoryEntity> {
    return this.categoriesService.updateOne(id, name, user);
  }

  @Delete('/:id')
  deleteCategoryById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.categoriesService.deleteOne(id, user);
  }
}
