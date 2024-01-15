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
import { AuthGuard } from '@nestjs/passport';
import { PhotosService } from './photos.service';
import { FilterPhotosDto } from './dto/filter-photos.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/auth/user.entity';
import { PhotoEntity } from './photo.entity';
import { AddPhotoDto } from './dto/add-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photos')
@UseGuards(AuthGuard())
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Get()
  getPhotos(
    @Query() filterDto: FilterPhotosDto,
    @GetUser() user: UserEntity,
  ): Promise<PhotoEntity[]> {
    return this.photosService.getAll(filterDto, user);
  }

  @Get('/:id')
  getPhotoById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<PhotoEntity> {
    return this.photosService.getOneById(id, user);
  }

  @Post()
  addPhoto(
    @Body() addPhotoDto: AddPhotoDto,
    @GetUser() user: UserEntity,
  ): Promise<PhotoEntity> {
    return this.photosService.addOne(addPhotoDto, user);
  }

  @Patch('/:id')
  updatePhotoById(
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
    @GetUser() user: UserEntity,
  ): Promise<PhotoEntity> {
    return this.photosService.updateOne(id, updatePhotoDto, user);
  }

  @Delete('/:id')
  deletePhotoById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.photosService.deleteOne(id, user);
  }
}
