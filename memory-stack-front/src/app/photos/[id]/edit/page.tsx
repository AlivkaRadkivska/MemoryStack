import { StampButton } from '@/components/buttons';
import PhotoForm from '@/components/photos/photo-form';
import { getCategories } from '@/services/categories-actions';
import { getPhoto } from '@/services/photos-actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface EditPhotoPageT {
  params: {
    id: string,
  }
}

export default async function EditPhotoPage({ params: { id } }: EditPhotoPageT) {
  const res = await getPhoto(id);
  if(!res) notFound();

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
      {'message' in res ?
        <p className='text-red text-center w-full'>{res.message}</p> :
        <PhotoForm title='Editing existing note' addNew={false} categories={categories} photo={res} />
      }
    </div>
  )
}
