import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/auth/user.entity';
import { CategoryEntity } from './category.entity';
import { AuthGuard } from '@nestjs/passport';
import { CategoryDto } from './dto/category.dto';
import { FilterCategoriesDto } from './dto/filter-categories.dto';

@Controller('categories')
@UseGuards(AuthGuard())
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(
    @Query() filterDto: FilterCategoriesDto,
    @GetUser() user: UserEntity,
  ): Promise<CategoryEntity[]> {
    return this.categoriesService.getAll(filterDto, user);
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
    @Body() categoryDto: CategoryDto,
    @GetUser() user: UserEntity,
  ): Promise<CategoryEntity> {
    return this.categoriesService.addOne(categoryDto, user);
  }

  @Patch('/:id')
  updateCategoryById(
    @Param('id') id: string,
    @Body() categoryDto: CategoryDto,
    @GetUser() user: UserEntity,
  ): Promise<CategoryEntity> {
    return this.categoriesService.updateOne(id, categoryDto, user);
  }

  @Delete('/:id')
  deleteCategoryById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.categoriesService.deleteOne(id, user);
  }
}
