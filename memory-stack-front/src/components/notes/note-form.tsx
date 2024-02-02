'use client';
import { addNote, editNote } from '@/services/notes-actions';
import { NoteT } from '@/types/note';
import { useFormState } from 'react-dom';
import { StampButton } from '../buttons';
import { Input } from '../form-elements/input';
import { PaperSheetContainer } from '../paper-sheet-container';
import { CategorySelector } from '../form-elements/category-selector';
import { CategoryT } from '@/types/category';
import { badScript } from '@/fonts/bad-script';
import { Textarea } from '../form-elements/textarea';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';

interface NoteFormT {
  title: string;
  addNew: boolean;
  categories: CategoryT[] | { message: string[] };
  note?: NoteT;
}

export default function NoteForm({ title, addNew, categories, note }: NoteFormT) {
  const [formState, submit] = useFormState(addNew ? addNote : editNote, { message: [] });

  if(categories instanceof Array && categories.length < 0)
    redirect('/categories');

  return (
    <PaperSheetContainer>
      {'message' in categories ? 
      <p>{categories.message}</p> :
      <>
        <p className={`${badScript.className} -mt-7 w-full text-end`}>{title}</p>
        <form className='flex flex-col items-end gap-2 w-full p-0' action={submit}>
          {note &&
            <input name='id' id='id' type='text' value={note.id} readOnly hidden/>
          }
          <Input
            label='date:'
            id='date'
            name='date'
            type='date'
            placeholder=''
            prevValue={note ? format(note.date, 'yyyy-MM-dd'): ''}
          />
          
          <Input 
            label='title:' 
            id='title' 
            name='title' 
            type='text' 
            placeholder='family and friends'
            prevValue={note ? note.title : ''}
          />

          <Textarea 
            label='content:'
            id='content' 
            name='content' 
            placeholder='text'
            prevValue={note ? note.content : ''}
          />

          <CategorySelector 
            id='category_id'
            name='category_id'
            label='category:'
            options={categories}
            prevValue={note ? note.category.id : ''}
          />

          {formState.message instanceof Array && formState.message.map(( el, i ) => 
            <p key={i} className='text-red text-center w-full'>{el}</p>
          )}

          <StampButton>
            <input type='submit' value='confirm' className='cursor-pointer'/>
          </StampButton>
        </form>
      </>}
    </PaperSheetContainer>
  );
}
