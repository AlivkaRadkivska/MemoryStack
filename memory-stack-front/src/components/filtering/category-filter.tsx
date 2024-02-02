'use client';
import { CategoryT } from '@/types/category';
import { StampButton } from '../buttons';
import { redirect } from 'next/navigation';
import { SetStateAction, useState } from 'react';

interface CategoryFilterInputT {
  prevValue: string;
  categories: CategoryT[];
  path: string;
}

export default function CategoryFilterInput({ prevValue, path, categories }: CategoryFilterInputT) {
  const [categoryId, setCategoryId] = useState(prevValue)

  function handleChange(e: { target: { value: SetStateAction<string>; }; }) {
    setCategoryId(e.target.value);
  }

  if(categoryId != prevValue && categoryId === 'any')
    redirect(path);
  
  if(categoryId != prevValue)
    redirect(`${path}?categoryId=${categoryId}`);


  return (
    <StampButton>
      <form className='-m-1'>
        <select 
          className='cursor-pointer' 
          value={categoryId} 
          name='categoryId' 
          id='categoryId' 
          onChange={handleChange}
        >
          <option value='any'>Any category</option>
          {!('message' in categories) && categories instanceof Array &&
            categories.map((el) =>
              <option key={el.id} value={el.id}>{el.name}</option>
            )}
        </select>
      </form>
    </StampButton>
  );
}