'use client';
import { badScript } from '@/fonts/bad-script';
import { SetStateAction, useState } from 'react';

interface TextareaT {
  label: string,
  placeholder: string,
  name: string,
  id: string,
  prevValue: string,
}

export function Textarea({ label, placeholder, name, id, prevValue }: TextareaT) {
  const [value, setValue] = useState(prevValue);

  function handleChange(e: { target: { value: SetStateAction<string>; }; }) {
    setValue(e.target.value);
  }

  return (
    <label htmlFor={id} className='flex flex-col w-full text-center text-blue'> 
      {label}
      <textarea className={`${badScript.className} w-full bg-gray p-1 m-2 !font-semibold
        border-y-2 border-dashed text-blue focus:border-dashed focus:border-indigo focus:text-indigo 
        focus:outline-none`}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        rows={4}
        value={value}
      />
    </label>
  );
}