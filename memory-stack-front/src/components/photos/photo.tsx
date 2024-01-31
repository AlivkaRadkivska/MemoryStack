'use client';
import Image from 'next/image';

interface PhotoT {
  src: string;
  name?: string;
}

export default function Photo({ src, name }: PhotoT) {
  return (
    <>
      {name ? <>
        <a href={src} download={name}>
          <Image
            className='w-full border-4 rounded border-blue border-double ease-in-out duration-75'
            src={src} 
            alt='photo memory' 
            width={1600}
            height={1600}
            priority
          />
        </a>
        
        <p className='text-blue mt-1 w-full'>*click the photo to download it</p>
      </> : 
        <Image
          className='w-full border-4 rounded border-blue border-double ease-in-out duration-75'
          src={src} 
          alt='old photo' 
          width={1600}
          height={1600}
          priority
        />
      }
    </>
  );
}