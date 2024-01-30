import { deleteCategory } from '@/services/categories-actions';
import { StampButton } from '@/components/buttons';
import Link from 'next/link';

interface DeleteCategoryPageT {
  params: {
    id: string,
  }
}

export default async function DeleteCategoryPage({ params: { id } }: DeleteCategoryPageT) {
  const res = await deleteCategory(id);

  return (
    <div className='flex w-full h-full items-center justify-center bg-gray'>
      <div className='flex flex-col items-center gap-2'>
        <p className='text-red text-center w-full'>{res.message}</p>

        <StampButton>
          <Link href='/categories'>
            get back
          </Link>
        </StampButton>
      </div>
    </div>
  );
}