import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoEntity } from './photo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity]), AuthModule],
  providers: [PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}
