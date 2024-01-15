import { NoteEntity } from 'src/notes/note.entity';
import { PhotoEntity } from 'src/photos/photo.entity';
import { CategoryEntity } from 'src/categories/category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => NoteEntity, (note) => note.user, { eager: true })
  notes: NoteEntity[];

  @OneToMany((_type) => PhotoEntity, (photo) => photo.user, { eager: true })
  photos: PhotoEntity[];

  @OneToMany((_type) => CategoryEntity, (category) => category.user, {
    eager: true,
  })
  categories: CategoryEntity[];
}
