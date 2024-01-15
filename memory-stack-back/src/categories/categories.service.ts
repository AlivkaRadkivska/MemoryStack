import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { UserEntity } from 'src/auth/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAll(user: UserEntity): Promise<CategoryEntity[]> {
    const query = this.categoryRepository.createQueryBuilder('category');

    query.where({ user });
    const categories = await query.getMany();

    return categories;
  }

  async getOneById(id: string, user: UserEntity): Promise<CategoryEntity> {
    const found = await this.categoryRepository.findOneBy({ id, user });

    if (!found) throw new NotFoundException();

    return found;
  }

  async addOne(name: string, user: UserEntity): Promise<CategoryEntity> {
    const category = this.categoryRepository.create({
      name,
      user,
    });

    await this.categoryRepository.save(category);
    return category;
  }

  async updateOne(
    id: string,
    name: string,
    user: UserEntity,
  ): Promise<CategoryEntity> {
    const category = await this.getOneById(id, user);

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
        throw new ConflictException('This category is using right now');
    }

    if (res.affected === 0) throw new NotFoundException();
  }
}
