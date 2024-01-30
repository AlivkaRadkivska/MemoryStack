import { StampButton } from '@/components/buttons';
import Link from 'next/link';
import { deleteNote } from '@/services/notes-actions';

interface DeleteNotePageT {
  params: {
    id: string,
  }
}

export default async function DeleteNotePage({ params: { id } }: DeleteNotePageT) {
  const res = await deleteNote(id);

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