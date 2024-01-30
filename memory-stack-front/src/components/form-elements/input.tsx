'use client';
import { badScript } from '@/fonts/bad-script';
import { SetStateAction, useState } from 'react';

interface FormInputT {
  label: string,
  placeholder: string,
  type: string,
  name: string,
  id: string,
  prevValue: string,
}

export function Input({ label, placeholder, type, name, id, prevValue }: FormInputT) {
  const [value, setValue] = useState(prevValue);

  function handleChange(e: { target: { value: SetStateAction<string>; }; }) {
    setValue(e.target.value);
  }

  return (
    <label htmlFor={id} className='flex flex-col w-full text-center text-blue'> 
      {label}
      <input className={`${badScript.className} w-full bg-gray p-1 m-2 !font-semibold
        border-y-2 border-dashed text-blue focus:border-dashed focus:border-indigo focus:text-indigo 
        focus:outline-none`}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}