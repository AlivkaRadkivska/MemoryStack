'use client';
import Link from 'next/link';
import { StickerButton } from '@/components/buttons';
import { usePathname } from 'next/navigation';

export default function NotebookContainer({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <div className='flex'>
      <div className='flex flex-col gap-3 py-7 justify-end'>
        <StickerButton red={true}>
          <Link href='/logout'>logout</Link>
        </StickerButton>
      </div>
      <div className='bg-blue w-md h-md pt-2 pl-4 pb-4 rounded rounded-b-2xl'>
        {children}
      </div>
      <div className='flex flex-col gap-3 py-5 items-start'>
        <StickerButton active={path === '/categories'}>
          <Link href='/categories'>manage categories</Link>
        </StickerButton>
        <StickerButton active={path === '/notes'}>
          <Link href='/notes'>list of notes</Link>
        </StickerButton>
        <StickerButton active={path === '/photos'}>
          <Link href='/photos'>list of photos</Link>
        </StickerButton>
      </div>
    </div>
  );
}
