import { StampButton } from '@/components/buttons';
import { deletePhoto, getPhoto } from '@/services/photos-actions';
import Link from 'next/link';

interface DeletePhotoPageT {
  params: {
    id: string,
  }
}

export default async function DeletePhotoPage({ params: { id } }: DeletePhotoPageT) {
  let res;
  
  const photo = await getPhoto(id);
  if('name' in photo)
    res = await deletePhoto(id, photo.name);
  else
    res = photo;

  return (
    <div className='flex w-full h-full items-center justify-center bg-gray'>
      <div className='flex flex-col items-center gap-2'>
        <p className='text-red text-center w-full'>{res.message}</p>

        <StampButton>
          <Link href='/notes'>
            get back
          </Link>
        </StampButton>
      </div>
    </div>
  );
}