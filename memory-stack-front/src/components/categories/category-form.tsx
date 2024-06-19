'use client';
import { addCategory, editCategory } from '@/services/categories-actions';
import { StampButton } from '@/components/buttons';
import { Input } from '@/components/form-elements/input';
import { PaperSheetContainer } from '@/components/paper-sheet-container';
import { CategoryT } from '@/types/category';
import { useFormState } from 'react-dom';
import { badScript } from '@/services/fonts/bad-script';

interface CategoryFormT {
  title: string;
  addNew: boolean;
  category?: CategoryT;
}

export function CategoryForm({ title, addNew, category }: CategoryFormT) {
  const [formState, submit] = useFormState(addNew ? addCategory : editCategory, { message: [] });

  return (
    <PaperSheetContainer>
      <p className={`${badScript.className} -mt-7 w-full text-end`}>{title}</p>
      <form className='flex flex-col items-end gap-2 w-full p-0' action={submit}>
        {category &&
          <input name='id' id='id' type='text' value={category.id} readOnly hidden/>
        }
        <Input
          label='name:' 
          id='name' 
          name='name' 
          type='text' 
          placeholder='family and friends'
          prevValue={category ? category.name : ''}
        />

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
