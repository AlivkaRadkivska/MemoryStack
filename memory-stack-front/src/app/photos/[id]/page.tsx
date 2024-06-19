import { StampButton } from "@/components/buttons";
import { PaperSheetContainer } from "@/components/paper-sheet-container";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { badScript } from "@/services/fonts/bad-script";
import { getPhoto } from "@/services/photos-actions";
import Photo from "@/components/photos/photo";
import { DeletePhotoForm } from "@/components/photos/delete-photo-form";

interface PhotoPageT {
  params: {
    id: string;
  };
}

export default async function PhotoPage({ params: { id } }: PhotoPageT) {
  const res = await getPhoto(id);
  if (!res) notFound();

  return (
    <div
      className={`${badScript.className} flex flex-col bg-gray w-full 
    h-full rounded-b-xl px-8 py-4 items-center justify-start`}
    >
      <div className="flex justify-start w-full">
        <StampButton>
          <Link href="/">to home page</Link>
        </StampButton>
      </div>

      {"message" in res ? (
        <p className="text-red text-center w-full">{res.message}</p>
      ) : (
        <>
          <PaperSheetContainer>
            <p className="text-blue -mt-7 text-end w-full">{format(res.date, "MMMM dd, yyyy")}</p>
            <p className="text-indigo text-center w-full font-semibold">{res.caption}</p>
            <Photo src={res.name} name={res.caption} />
          </PaperSheetContainer>

          <div className="flex justify-between w-full">
            <StampButton>
              <Link href={`/photos/${id}/edit`}>edit this one</Link>
            </StampButton>
            <DeletePhotoForm photo={res} />
          </div>
        </>
      )}
    </div>
  );
}
