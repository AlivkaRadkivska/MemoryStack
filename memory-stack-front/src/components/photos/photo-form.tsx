"use client";
import { useFormState } from "react-dom";
import { StampButton } from "../buttons";
import { Input } from "../form-elements/input";
import { PaperSheetContainer } from "../paper-sheet-container";
import { CategorySelector } from "../form-elements/category-selector";
import { CategoryT } from "@/types/category";
import { badScript } from "@/services/fonts/bad-script";
import { format } from "date-fns";
import { PhotoT } from "@/types/photo";
import { addPhoto, editPhoto } from "@/services/photos-actions";
import { redirect } from "next/navigation";
import Photo from "./photo";

interface PhotoFormT {
  title: string;
  addNew: boolean;
  categories: CategoryT[] | { message: string[] };
  photo?: PhotoT;
}

export default function PhotoForm({ title, addNew, categories, photo }: PhotoFormT) {
  const [formState, submit] = useFormState(addNew ? addPhoto : editPhoto, {
    message: [],
  });

  if (categories instanceof Array && categories.length < 0) redirect("/categories");

  return (
    <PaperSheetContainer>
      {"message" in categories ? (
        <p>{categories.message}</p>
      ) : (
        <>
          <p className={`${badScript.className} -mt-7 w-full text-end`}>{title}</p>
          <form className="flex flex-col items-end gap-2 w-full p-0" action={submit}>
            {photo && <input name="id" id="id" type="text" value={photo.id} readOnly hidden />}
            <Input
              label="date:"
              id="date"
              name="date"
              type="date"
              placeholder=""
              prevValue={photo ? format(photo.date, "yyyy-MM-dd") : ""}
            />

            <Input
              label="caption:"
              id="caption"
              name="caption"
              type="text"
              placeholder="family and friends"
              prevValue={photo ? photo.caption : ""}
            />

            <Input label="photo:" id="name" name="name" type="file" placeholder="" prevValue={""} />
            {photo && (
              <>
                <p className="w-full">old photo (don&apos;t choose any to keep it):</p>
                <Photo src={photo.name} name={photo.caption} />
                <input name="old_name" id="old_name" type="text" value={photo.name} readOnly hidden />
              </>
            )}

            <CategorySelector
              id="category_id"
              name="category_id"
              label="category:"
              options={categories}
              prevValue={photo ? photo.category.id : ""}
            />

            {formState.message instanceof Array &&
              formState.message.map((el, i) => (
                <p key={i} className="text-red text-center w-full">
                  {el}
                </p>
              ))}

            <StampButton>
              <input type="submit" value="confirm" className="cursor-pointer" />
            </StampButton>
          </form>
        </>
      )}
    </PaperSheetContainer>
  );
}
