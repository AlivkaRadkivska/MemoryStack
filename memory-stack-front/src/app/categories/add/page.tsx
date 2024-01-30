import { StampButton } from '@/components/buttons';
import { CategoryForm } from '@/components/categories/category-form';
import Link from 'next/link';

export default function AddCategoryPage() {
  return (
    <div className='flex flex-col bg-gray w-full h-full rounded-b-xl px-8 py-4 items-center justify-start'>
      <div className='flex justify-start w-full'>
        <StampButton>
          <Link href='/'>
            to home page
          </Link>
        </StampButton>
      </div>
      <CategoryForm title='Adding new category' addNew={true} />
    </div>
  )
}
