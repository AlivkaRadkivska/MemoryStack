import { UserForm } from '@/components/auth/user-form';
import { StampButton } from '@/components/buttons';
import Link from 'next/link';

export default function SignUpPage() {
  // redirect if authenticated

  return (
    <div className='flex flex-col bg-gray w-full h-full rounded-b-xl px-8 py-4 items-center justify-start'>
      <div className='flex justify-start w-full'>
        <StampButton>
          <Link href='/'>
            to home page
          </Link>
        </StampButton>
      </div>
      <UserForm title='Create a new account' addNew={true} />
    </div>
  );
}