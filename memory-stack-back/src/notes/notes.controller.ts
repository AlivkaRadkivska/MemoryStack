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
import { NotesService } from './notes.service';
import { NoteDto } from './dto/note.dto';
import { NoteEntity } from './note.entity';
import { FilterNotesDto } from './dto/filter-notes.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes(
    @Query() filterDto: FilterNotesDto,
    @GetUser() user: UserEntity,
  ): Promise<NoteEntity[]> {
    return this.notesService.getAll(filterDto, user);
  }

  @Get('/:id')
  getNoteById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<NoteEntity> {
    return this.notesService.getOneById(id, user);
  }

  @Post()
  addNote(
    @Body() addNoteDto: NoteDto,
    @GetUser() user: UserEntity,
  ): Promise<NoteEntity> {
    return this.notesService.addOne(addNoteDto, user);
  }

  @Patch('/:id')
  updateNoteById(
    @Param('id') id: string,
    @Body() updateNoteDto: NoteDto,
    @GetUser() user: UserEntity,
  ): Promise<NoteEntity> {
    return this.notesService.updateOne(id, updateNoteDto, user);
  }

  @Delete('/:id')
  deleteNoteById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.notesService.deleteOne(id, user);
  }
}
