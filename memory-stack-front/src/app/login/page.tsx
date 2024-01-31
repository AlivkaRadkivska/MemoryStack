import { UserForm } from '@/components/auth/user-form';
import { StampButton } from '@/components/buttons';
import { getCookie } from '@/utils/cookies-factory';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function LogInPage() {
  const token = await getCookie('token');
  if(token)
    redirect('/');

  return (
    <div className='flex flex-col bg-gray w-full h-full rounded-b-xl px-8 py-4 items-center justify-start'>
      <div className='flex justify-start w-full'>
        <StampButton>
          <Link href='/'>
            to home page
          </Link>
        </StampButton>
      </div>
      <UserForm title='Logining in' addNew={false} />
    </div>
  );
}
