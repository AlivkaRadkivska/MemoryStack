'use client';
import { FormEvent, SetStateAction, useState } from 'react';

interface SearchInputT {
  prevValue: string;
  path: string;
}

export default function SearchInput({ prevValue, path }: SearchInputT) {
  const [search, setSearch] = useState(prevValue)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if(search === prevValue)
      e.preventDefault();
  }

  function handleChange(e: { target: { value: SetStateAction<string>; }; }) {
    setSearch(e.target.value);
  }

  return (
    <form className='flex w-full gap-2 px-3 -my-4 mt-5 z-20' onSubmit={handleSubmit}>
      <input 
        className='w-full bg-transparent border-b-2 border-indigo focus:outline-none focus:border-purple px-1'
        type='text' 
        value={search} 
        onChange={handleChange} 
        placeholder='search here'
        name='search'
      />
      <input type='submit' value='🔍' className='cursor-pointer px-1'/>
    </form>
  );
}
