import { getCategories } from "@/services/categories-actions";
import { StampButton } from "@/components/buttons";
import { PaperSheetContainer } from "@/components/paper-sheet-container";
import { badScript } from "@/services/fonts/bad-script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function CategoriesTable() {
  const res = await getCategories();
  if (!res) notFound();

  return (
    <PaperSheetContainer>
      {!("message" in res) ? (
        res instanceof Array && res.length > 0 ? (
          res.map((el, i) => (
            <div key={el.id} className={`${badScript.className} flex w-full justify-between`}>
              <p>
                {++i}) {el.name}
              </p>
              <Link
                className="hover:underline decoration-wavy decoration-indigo ease-in-out duration-200"
                href={`/categories/${el.id}/edit`}
              >
                <p>🖊️/❌</p>
              </Link>
            </div>
          ))
        ) : (
          <>
            <p className={`${badScript.className}`}>Please add categories for your notes and photos.</p>
            <p className={`${badScript.className}`}>
              They&apos;ll help you to find right notes and photos much easier.
            </p>
          </>
        )
      ) : (
        <p className={`${badScript.className} `}>{res.message}</p>
      )}
    </PaperSheetContainer>
  );
}

export default async function CategoriesPage() {
  return (
    <div className="flex flex-col bg-gray w-full h-full rounded-b-xl px-8 py-4 items-center justify-start">
      <div className="flex justify-start w-full">
        <StampButton>
          <Link href="/">to home page</Link>
        </StampButton>
      </div>

      <Suspense fallback={<p className="w-full h-full flex items-start justify-center">Categories loading...</p>}>
        <CategoriesTable />
      </Suspense>

      <div className="flex justify-end w-full">
        <StampButton>
          <Link href="/categories/add">add category</Link>
        </StampButton>
      </div>
    </div>
  );
}
