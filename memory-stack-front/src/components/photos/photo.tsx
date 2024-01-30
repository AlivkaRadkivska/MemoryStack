'use client';
import Image from 'next/image';
import { useState } from 'react';

interface PhotoT {
  src: string;
}

export default function Photo({ src }: PhotoT) {
  const [opened, setOpened] = useState(false);

  function handleClick() {
    setOpened(curr => !curr);
  }

  return (
    <>
      <Image
        className={opened ? 'fixed w-full p-5 cursor-pointer top-0 right-0 ease-in-out duration-75 z-50 ' :
          'w-full border-4 rounded border-blue border-double cursor-pointer ease-in-out duration-75'} 
        src={src} 
        alt='private photo' 
        width={1600}
        height={1600}
        onClick={handleClick}
        priority
      />
      <p className='text-blue mt-1 w-full'>*click photo to open/close it</p>
    </>
  );
}