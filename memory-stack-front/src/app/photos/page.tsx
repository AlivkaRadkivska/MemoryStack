import { StampButton } from "@/components/buttons";
import CategoryFilterInput from "@/components/filtering/category-filter";
import SearchInput from "@/components/filtering/search";
import { PaperSheetContainer } from "@/components/paper-sheet-container";
import { badScript } from "@/services/fonts/bad-script";
import { getCategories } from "@/services/categories-actions";
import { getPhotos } from "@/services/photos-actions";
import { FiltersT } from "@/types/filters";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PhotosPageT {
  searchParams: FiltersT;
}

async function PhotosTable({ searchParams }: PhotosPageT) {
  const res = await getPhotos(searchParams);
  if (!res) notFound();

  return (
    <PaperSheetContainer>
      {!("message" in res) ? (
        res instanceof Array && res.length > 0 ? (
          res.map((el, i) => (
            <div key={el.id} className={`${badScript.className} flex w-full justify-start`}>
              <Link
                className="hover:underline decoration-wavy decoration-indigo ease-in-out 
                duration-200 flex w-full justify-between"
                href={`/photos/${el.id}`}
              >
                <p>
                  {++i}) {el.caption.length > 35 ? el.caption.substring(0, 35) + "..." : el.caption}
                </p>
                <p>details&gt;&gt;</p>
              </Link>
            </div>
          ))
        ) : (
          <p className={`${badScript.className} `}>No way, you didn&apos;t add any photo yet (0.0)</p>
        )
      ) : (
        <p className={`${badScript.className} `}>{res.message}</p>
      )}
    </PaperSheetContainer>
  );
}

export default async function PhotosPage({ searchParams }: PhotosPageT) {
  const categories = await getCategories();

  return (
    <div className="flex flex-col bg-gray w-full h-full rounded-b-xl px-8 py-4 items-center justify-start gap-2">
      <div className="flex justify-between w-full items-center">
        <StampButton>
          <Link href="/">to home page</Link>
        </StampButton>
        <Suspense key={searchParams.categoryId}>
          <CategoryFilterInput categories={!("message" in categories) ? categories : []} />
        </Suspense>
      </div>

      <Suspense key={searchParams.search}>
        <SearchInput placeholder="Photo caption" />
      </Suspense>

      <Suspense
        key={"" + searchParams.categoryId + searchParams.search}
        fallback={<p className="w-full h-full flex items-start justify-center">Notes loading...</p>}
      >
        <PhotosTable searchParams={searchParams} />
      </Suspense>

      <div className="flex justify-end w-full">
        <StampButton>
          <Link href="/photos/add">add photo</Link>
        </StampButton>
      </div>
    </div>
  );
}
