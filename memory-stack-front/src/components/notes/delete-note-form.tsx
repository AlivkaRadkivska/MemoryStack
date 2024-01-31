'use client';
import { StampButton } from '@/components/buttons';
import { deleteNote } from '@/services/notes-actions';
import { NoteT } from '@/types/note';
import { useFormState } from 'react-dom';

interface DeleteNoteFormT {
  note: NoteT;
}

export function DeleteNoteForm({ note }: DeleteNoteFormT) {
  const [formState, submit] = useFormState(deleteNote, { message: [] });

  return (
    <form action={submit} className='flex flex-col items-center'>
      <input name='id' id='id' type='text' value={note.id} readOnly hidden/>

      {formState.message instanceof Array && formState.message.map(( el, i ) => 
        <p key={i} className='text-red text-center w-full'>{el}</p>
      )}
      <StampButton red={true}>
        <input 
          className='cursor-pointer' 
          type='submit' 
          id='submit' 
          name='submit' 
          value='delete this one' 
        />
      </StampButton>
    </form>
  );
}
