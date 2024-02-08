'use client';
import Link from 'next/link';
import { StickerButton } from '@/components/buttons';
import { usePathname } from 'next/navigation';
import { LogoutForm } from './auth/logout-form';

interface NotebookContainerT {
  authenticated: boolean,
  children: React.ReactNode,
}

export default function NotebookContainer({ authenticated, children }: NotebookContainerT) {
  const path = usePathname();

  return (
    <div className='flex'>
      {authenticated && 
        <div className='flex flex-col gap-3 py-7 justify-end'>
          <LogoutForm />
        </div>
      }

      <div className='bg-blue w-md h-md pt-2 pl-4 pb-4 rounded rounded-b-2xl'>
        <div className='bg-gray w-full h-full rounded-b-xl'>
          {children}
        </div>
      </div>
      
      <div className='flex flex-col gap-3 py-5 items-start'>
        {authenticated ? <>
          <StickerButton active={path === '/categories'}>
            <Link href='/categories'>manage categories</Link>
          </StickerButton>
          <StickerButton active={path === '/notes'}>
            <Link href='/notes'>list of notes</Link>
          </StickerButton>
          <StickerButton active={path === '/photos'}>
            <Link href='/photos'>list of photos</Link>
          </StickerButton> 
        </> : <>
          <StickerButton active={path === '/login'}>
            <Link href='/login'>Log in</Link>
          </StickerButton>
          <StickerButton active={path === '/signup'}>
            <Link href='/signup'>Sign up</Link>
          </StickerButton>
        </>}
      </div>
    </div>
  );
}
