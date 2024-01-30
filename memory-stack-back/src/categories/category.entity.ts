import { Exclude } from 'class-transformer';
import { Validate } from 'class-validator';
import { UserEntity } from 'src/auth/user.entity';
import { NoteEntity } from 'src/notes/note.entity';
import { PhotoEntity } from 'src/photos/photo.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne((_type) => UserEntity, (user) => user.categories, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;

  @OneToMany((_type) => PhotoEntity, (photo) => photo.category, {
    eager: false,
  })
  photos: PhotoEntity[];

  @OneToMany((_type) => NoteEntity, (note) => note.category, { eager: false })
  notes: NoteEntity[];
}
