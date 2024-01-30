import { StampButton } from '@/components/buttons';
import PhotoForm from '@/components/photos/photo-form';
import { getCategories } from '@/services/categories-actions';
import Link from 'next/link';

export default async function AddPhotoPage() {
  const categories = await getCategories();

  return (
    <div className='flex flex-col bg-gray w-full h-full rounded-b-xl px-8 py-4 items-center justify-start'>
      <div className='flex justify-start w-full'>
        <StampButton>
          <Link href='/'>
            to home page
          </Link>
        </StampButton>
      </div>
      <PhotoForm title='Adding new photo' addNew={true} categories={categories} />
    </div>
  )
}
