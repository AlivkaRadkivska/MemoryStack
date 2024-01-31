import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { UserEntity } from 'src/auth/user.entity';
import { CategoryDto } from './dto/category.dto';
import { FilterCategoriesDto } from './dto/filter-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAll(
    filterDto: FilterCategoriesDto,
    user: UserEntity,
  ): Promise<CategoryEntity[]> {
    const query = this.categoryRepository.createQueryBuilder('category');
    const { search } = filterDto;

    query.where({ user });
    if (search)
      query.andWhere('(LOWER(note.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });

    const categories = await query.getMany();

    return categories;
  }

  async getOneByName(
    name: string,
    user: UserEntity,
  ): Promise<CategoryEntity | null> {
    return await this.categoryRepository.findOneBy({ name, user });
  }

  async getOneById(id: string, user: UserEntity): Promise<CategoryEntity> {
    const found = await this.categoryRepository.findOneBy({ id, user });

    if (!found) throw new NotFoundException();

    return found;
  }

  async addOne(
    categoryDto: CategoryDto,
    user: UserEntity,
  ): Promise<CategoryEntity> {
    const { name } = categoryDto;

    const category = this.categoryRepository.create({
      name,
      user,
    });

    await this.categoryRepository.save(category);
    return category;
  }

  async updateOne(
    id: string,
    categoryDto: CategoryDto,
    user: UserEntity,
  ): Promise<CategoryEntity> {
    const category = await this.getOneById(id, user);
    const { name } = categoryDto;

    const updated = { ...category, name };
    await this.categoryRepository.save(updated);

    return updated;
  }

  async deleteOne(id: string, user: UserEntity): Promise<void> {
    let res: DeleteResult;

    try {
      res = await this.categoryRepository.delete({ id, user });
    } catch (error) {
      if (error.code == 23503)
        throw new ConflictException([
          "This category is using and can't be deleted",
        ]);
    }

    if (res.affected === 0) throw new NotFoundException();
  }
}
