import { StampButton } from '@/components/buttons';
import { PaperSheetContainer } from '@/components/paper-sheet-container';
import { badScript } from '@/fonts/bad-script';
import { getPhotos } from '@/services/photos-actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function PhotosPage() {
  const res = await getPhotos();
  if(!res) notFound();

  return (
    <div className='flex flex-col bg-gray w-full h-full rounded-b-xl px-8 py-4 items-center justify-start'>
      <div className='flex justify-start w-full'>
        <StampButton>
          <Link href='/'>
            to home page
          </Link>
        </StampButton>
      </div>

      <PaperSheetContainer>
        {res instanceof Array && 
          (res.length > 0) ? res.map((el, i) => 
            <div key={el.id} className={`${badScript.className} flex w-full justify-start`}>
              <Link className='hover:underline decoration-wavy decoration-indigo ease-in-out 
              duration-200 flex w-full justify-between' href={`/photos/${el.id}`}>
                <p>{++i}) {el.caption.length > 35 ? el.caption.substring(0, 35) + '...' : el.caption}</p>
                <p>details&gt;&gt;</p>
              </Link>
            </div>
        ) : <p className={`${badScript.className} text-purple`}>No way, you didn&apos;t add any photo yet (0.0)</p>}

        {'message' in res && 
          <p>{res.message}</p>
        }
      </PaperSheetContainer>

      <div className='flex justify-end w-full'>
        <StampButton>
          <Link href='/photos/add'>
            add photo
          </Link>
        </StampButton>
      </div>
    </div>
  )
}
