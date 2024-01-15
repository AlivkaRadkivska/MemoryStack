import { Injectable, NotFoundException } from '@nestjs/common';
import { PhotoEntity } from './photo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterPhotosDto } from './dto/filter-photos.dto';
import { UserEntity } from 'src/auth/user.entity';
import { AddPhotoDto } from './dto/add-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {}

  async getAll(
    filterDto: FilterPhotosDto,
    user: UserEntity,
  ): Promise<PhotoEntity[]> {
    const { categoryId, search } = filterDto;
    const query = this.photoRepository.createQueryBuilder('photo');

    query.where({ user });

    if (categoryId)
      query.andWhere('photo.categoryId = :categoryId', { categoryId });
    if (search)
      query.andWhere('(LOWER(photo.caption) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });

    const photos = await query.getMany();

    return photos;
  }

  async getOneById(id: string, user: UserEntity): Promise<PhotoEntity> {
    const found = await this.photoRepository.findOneBy({ id, user });

    if (!found) throw new NotFoundException();

    return found;
  }

  async addOne(
    addPhotoDto: AddPhotoDto,
    user: UserEntity,
  ): Promise<PhotoEntity> {
    const { path, caption, date, category } = addPhotoDto;

    const photo = this.photoRepository.create({
      path,
      caption,
      category,
      date,
      user,
    });

    await this.photoRepository.save(photo);
    return photo;
  }

  async updateOne(
    id: string,
    updatePhotoDto: UpdatePhotoDto,
    user: UserEntity,
  ): Promise<PhotoEntity> {
    const photo = await this.getOneById(id, user);

    const updated = { ...photo, ...updatePhotoDto };
    await this.photoRepository.save(updated);

    return updated;
  }

  async deleteOne(id: string, user: UserEntity): Promise<void> {
    const res = await this.photoRepository.delete({ id, user });

    if (res.affected === 0) throw new NotFoundException();
  }
}
