'use client';
import { StampButton } from '@/components/buttons';
import { deleteCategory } from '@/services/categories-actions';
import { CategoryT } from '@/types/category';
import { useFormState } from 'react-dom';

interface DeleteCategoryFormT {
  category: CategoryT;
}

export function DeleteCategoryForm({ category }: DeleteCategoryFormT) {
  const [formState, submit] = useFormState(deleteCategory, { message: [] });

  return (
    <form action={submit} className='flex flex-col items-center'>
      <input name='id' id='id' type='text' value={category.id} readOnly hidden/>

      {formState.message instanceof Array && formState.message.map(( el, i ) => 
        <p key={i} className='text-red text-center w-full'>{el}</p>
      )}
      
      {!formState.message && <p className='text-indigo'>
        *by the way, categories containing notes or/and photos won&apos;t be deleted
      </p>}
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
