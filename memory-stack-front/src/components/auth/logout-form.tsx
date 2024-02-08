'use client';
import { StickerButton } from '@/components/buttons';
import { logOut } from '@/services/auth-actions';

export async function LogoutForm() {
  return (
    <form action={logOut}>
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
