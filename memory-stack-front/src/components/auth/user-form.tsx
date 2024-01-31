'use client';
import { StampButton } from '@/components/buttons';
import { Input } from '@/components/form-elements/input';
import { PaperSheetContainer } from '@/components/paper-sheet-container';
import { useFormState } from 'react-dom';
import { badScript } from '@/fonts/bad-script';
import { signUp, logIn } from '@/services/auth-actions';

interface UserFormT {
  title: string;
  addNew: boolean;
}

export function UserForm({ title, addNew }: UserFormT) {
  const [formState, submit] = useFormState(addNew ? signUp : logIn, { message: [] });

  return (
    <PaperSheetContainer>
      <p className={`${badScript.className} -mt-7 w-full text-end`}>{title}</p>
      <form className='flex flex-col items-end gap-2 w-full p-0' action={submit}>
        <Input
          label={`username${addNew ? ' (unique)' : ''}:`}
          id='username' 
          name='username' 
          type='text' 
          placeholder='nice_name'
          prevValue={''}
        />

        <Input
          label='password:'
          id='password' 
          name='password' 
          type='password' 
          placeholder='secure_password'
          prevValue={''}
        />

        {addNew &&
          <Input
            label='confirm password:'
            id='confirm_password' 
            name='confirm_password' 
            type='password' 
            placeholder='secure_password'
            prevValue={''}
          />
        }

        {formState.message instanceof Array && formState.message.map(( el, i ) => 
          <p key={i} className='text-red text-center w-full'>{el}</p>
        )}

        <StampButton>
          <input type='submit' value='confirm' className='cursor-pointer'/>
        </StampButton>
      </form>
    </PaperSheetContainer>
  );
}
