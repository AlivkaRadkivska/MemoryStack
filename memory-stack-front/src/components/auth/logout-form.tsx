'use client';
import { StickerButton } from '@/components/buttons';
import { useFormState } from 'react-dom';
import { logOut } from '@/services/auth-actions';

export function LogoutForm() {
  const [formState, submit] = useFormState(logOut, { message: [] });

  return (
    <form action={submit}>
      <StickerButton red={true}>
        <input 
          type='submit' 
          id='submit' 
          name='submit' 
          value='logout' 
          className='cursor-pointer' 
        />
      </StickerButton>
    </form>
  );
}
