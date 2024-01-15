import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/auth/user.entity';
import { CategoryEntity } from 'src/categories/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'photo' })
export class PhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column()
  caption: string;

  @Column()
  date: Date;

  @ManyToOne((_type) => CategoryEntity, (category) => category.photos, {
    eager: true,
  })
  category: CategoryEntity;

  @ManyToOne((_type) => UserEntity, (user) => user.photos, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;
}
