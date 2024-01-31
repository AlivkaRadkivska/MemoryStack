import { StampButton } from '@/components/buttons';
import { PaperSheetContainer } from '@/components/paper-sheet-container';
import { badScript } from '@/fonts/bad-script';
import { getNotes } from '@/services/notes-actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function NotesPage() {
  const res = await getNotes();
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
        {!('message' in res) 
          ? res instanceof Array && (res.length > 0) 
            ? res.map((el, i) =>
              <div key={el.id} className={`${badScript.className} flex w-full justify-start`}>
                <Link className='hover:underline decoration-wavy decoration-indigo ease-in-out 
                duration-200 flex w-full justify-between' href={`/notes/${el.id}`}>
                  <p>{++i}) {el.title.length > 35 ? el.title.substring(0, 35) + '...' : el.title}</p>
                  <p>details&gt;&gt;</p>
                </Link>
              </div>) 
            : <p className={`${badScript.className}`}>
              No way, you didn&apos;t add any note yet (0.0)
            </p>

          : <p className={`${badScript.className} `}>{res.message}</p>
        }
      </PaperSheetContainer>

      {!('message' in res) &&
        <div className='flex justify-end w-full'>
          <StampButton>
            <Link href='/notes/add'>
              add note
            </Link>
          </StampButton>
        </div>
      }
    </div>
  )
}
