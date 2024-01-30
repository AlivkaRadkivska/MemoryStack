import { getCategory } from '@/services/categories-actions';
import { StampButton } from '@/components/buttons';
import { CategoryForm } from '@/components/categories/category-form';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface EditCategoryPageT {
  params: {
    id: string,
  }
}

export default async function EditCategoryPage({ params: { id } }: EditCategoryPageT) {
  const res = await getCategory(id);
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
      {'message' in res ?
        <p className='text-red text-center w-full'>{res.message}</p> :
        <>
          <CategoryForm title='Editing existing category' addNew={false} category={res} />

          <p className='text-indigo'>
            *by the way, categories containing notes or/and photos won&apos;t be deleted
          </p>
          <StampButton red={true}>
            <Link href={`/categories/${id}/delete`}>
              delete this one
            </Link>
          </StampButton>
        </>
      }
    </div>
  )
}
