import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';
import { FilterNotesDto } from './dto/filter-notes.dto';
import { NoteEntity } from './note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}

  async getAll(
    filterDto: FilterNotesDto,
    user: UserEntity,
  ): Promise<NoteEntity[]> {
    const { categoryId, search } = filterDto;
    const query = this.noteRepository.createQueryBuilder('note');

    query.where({ user });

    if (categoryId)
      query.andWhere('note.categoryId = :categoryId', { categoryId });
    if (search)
      query.andWhere(
        '(LOWER(note.title) LIKE LOWER(:search) OR LOWER(note.content) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );

    const notes = await query.getMany();

    return notes;
  }

  async getOneById(id: string, user: UserEntity): Promise<NoteEntity> {
    const found = await this.noteRepository.findOneBy({ id, user });

    if (!found) throw new NotFoundException();

    return found;
  }

  async addOne(addNoteDto: NoteDto, user: UserEntity): Promise<NoteEntity> {
    const { title, content, date, category } = addNoteDto;

    const note = this.noteRepository.create({
      category,
      title,
      content,
      date,
      user,
    });

    await this.noteRepository.save(note);
    return note;
  }

  async updateOne(
    id: string,
    updateNoteDto: NoteDto,
    user: UserEntity,
  ): Promise<NoteEntity> {
    const note = await this.getOneById(id, user);

    const updated = { ...note, ...updateNoteDto };
    await this.noteRepository.save(updated);

    return updated;
  }

  async deleteOne(id: string, user: UserEntity): Promise<void> {
    const res = await this.noteRepository.delete({ id, user });

    if (res.affected === 0) throw new NotFoundException();
  }
}
