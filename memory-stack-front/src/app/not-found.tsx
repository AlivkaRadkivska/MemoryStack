import { StampButton } from '@/components/buttons';
import Link from 'next/link';

export default async function LoadingData() {
  return (
    <div className='flex flex-col bg-gray w-full h-full rounded-b-xl px-8 py-4 items-center justify-center'>
      <div className='flex justify-start self-start w-full'>
        <StampButton>
          <Link href='/'>
            to home page
          </Link>
        </StampButton>
      </div>
      <div className='flex flex-col w-full h-full items-center justify-center gap-2'>
        <p>Er.404 | There is no such a page</p>
        <p>¯\_(ツ)_/¯</p>
      </div>
    </div>
  );
}
