'use client';
import { badScript } from '@/services/fonts/bad-script';
import { CategoryT } from '@/types/category';
import { SetStateAction, useState } from 'react';

interface CategorySelectorT {
  label: string,
  options: Array<CategoryT>
  name: string,
  id: string,
  prevValue: string,
}

export function CategorySelector({ label, options, name, id, prevValue }: CategorySelectorT) {
  const [value, setValue] = useState(prevValue);

  function handleChange(e: { target: { value: SetStateAction<string>; }; }) {
    setValue(e.target.value);
  }

  return (
    <label htmlFor={id} className='flex flex-col w-full text-center text-blue'> 
      {label}
      <select className={`${badScript.className} w-full bg-gray p-1 m-2 !font-semibold
      border-y-2 border-dashed text-blue focus:border-dashed focus:border-indigo focus:text-indigo 
      focus:outline-none`} name={name} id={id} value={value} onChange={handleChange}>
        {options.map((el) => 
          <option key={el.id} value={el.id}>{el.name}</option>
        )}
      </select>
    </label>
  );
}
