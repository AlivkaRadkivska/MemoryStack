import { StampButton } from '@/components/buttons';
import NoteForm from '@/components/notes/note-form';
import { getCategories } from '@/services/categories-actions';
import { getNote } from '@/services/notes-actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface EditNotePageT {
  params: {
    id: string,
  }
}

export default async function EditNotePage({ params: { id } }: EditNotePageT) {
  const res = await getNote(id);
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
        <NoteForm title='Editing existing note' addNew={false} categories={categories} note={res} />
      }
    </div>
  )
}
