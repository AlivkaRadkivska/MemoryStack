import { StampButton } from "@/components/buttons";
import { PaperSheetContainer } from "@/components/paper-sheet-container";
import { getNote } from "@/services/notes-actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { badScript } from "@/services/fonts/bad-script";
import { DeleteNoteForm } from "@/components/notes/delete-note-form";

interface NotePageT {
  params: {
    id: string;
  };
}

export default async function NotePage({ params: { id } }: NotePageT) {
  const res = await getNote(id);
  if (!res) notFound();

  return (
    <div
      className={`${badScript.className} flex flex-col bg-gray w-full h-full rounded-b-xl px-8 py-4 items-center justify-start`}
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
            <p className="text-blue text-end w-full">{format(res.date, "MMMM dd, yyyy")}</p>
            <p className="text-purple text-center w-full font-semibold">{res.title}</p>
            <p className="text-blue">
              {res.content.split("\n").map((item, i) => (
                <span className="mb-1" key={i}>
                  {item}
                  <br />
                </span>
              ))}
            </p>
          </PaperSheetContainer>

          <div className="flex justify-between w-full">
            <StampButton>
              <Link href={`/notes/${id}/edit`}>edit this one</Link>
            </StampButton>

            <DeleteNoteForm note={res} />
          </div>
        </>
      )}
    </div>
  );
}
