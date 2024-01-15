import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/auth/user.entity';
import { CategoryEntity } from 'src/categories/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'note' })
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  date: Date;

  @ManyToOne((_type) => CategoryEntity, (category) => category.notes, {
    eager: true,
  })
  category: CategoryEntity;

  @ManyToOne((_type) => UserEntity, (user) => user.notes, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;
}
