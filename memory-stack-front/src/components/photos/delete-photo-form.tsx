'use client';
import { StampButton } from '@/components/buttons';
import { deletePhoto } from '@/services/photos-actions';
import { PhotoT } from '@/types/photo';
import { useFormState } from 'react-dom';

interface DeletePhotoFormT {
  photo: PhotoT;
}

export function DeletePhotoForm({ photo }: DeletePhotoFormT) {
  const [formState, submit] = useFormState(deletePhoto, { message: [] });

  return (
    <form action={submit} className='flex flex-col items-center'>
      <input name='id' id='id' type='text' value={photo.id} readOnly hidden/>
      <input name='name' id='name' type='text' value={photo.name} readOnly hidden/>

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
