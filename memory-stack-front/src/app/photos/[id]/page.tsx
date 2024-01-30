import { StampButton } from '@/components/buttons';
import { PaperSheetContainer } from '@/components/paper-sheet-container';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { badScript } from '@/fonts/bad-script';
import { getPhoto } from '@/services/photos-actions';
import Photo from '@/components/photos/photo';

interface PhotoPageT {
  params: {
    id: string;
  }
}

export default async function PhotoPage({ params: { id } }: PhotoPageT) {
  const res = await getPhoto(id);
  if(!res) notFound();

  return (
    <div className={`${badScript.className} flex flex-col bg-gray w-full 
    h-full rounded-b-xl px-8 py-4 items-center justify-start`}>
      <div className='flex justify-start w-full'>
        <StampButton>
          <Link href='/'>
            to home page
          </Link>
        </StampButton>
      </div>

      {'message' in res ?
        <p className='text-red text-center w-full'>{res.message}</p> :
        
        <>
          <PaperSheetContainer>
            <p className='text-blue -mt-7 text-end w-full'>{format(res.date, 'MMMM dd, yyyy')}</p>
            <p className='text-indigo text-center w-full font-semibold'>{res.caption}</p>
            <Photo src={`/uploads/${res.name}`} />
          </PaperSheetContainer>

          <div className='flex justify-between w-full'>
            <StampButton>
              <Link href={`/photos/${id}/edit`}>
                edit this one
              </Link>
            </StampButton>
            <StampButton red={true}>
              <Link href={`/photos/${id}/delete`}>
                delete this one
              </Link>
            </StampButton>
          </div>
        </>
      }
    </div>
  )
}