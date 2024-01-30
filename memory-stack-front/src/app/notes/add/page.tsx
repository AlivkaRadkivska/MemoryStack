import { StampButton } from '@/components/buttons';
import NoteForm from '@/components/notes/note-form';
import { getCategories } from '@/services/categories-actions';
import Link from 'next/link';

export default async function AddNotePage() {
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
      <NoteForm title='Adding new note' addNew={true} categories={categories} />
    </div>
  )
}
