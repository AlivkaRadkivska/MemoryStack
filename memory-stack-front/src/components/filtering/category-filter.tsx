"use client";
import { CategoryT } from "@/types/category";
import { StampButton } from "../buttons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilterInput({ categories }: { categories: CategoryT[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    if (value === "any") params.delete("categoryId");
    else params.set("categoryId", value);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <StampButton>
      <select
        className="cursor-pointer text-center -m-1"
        name="categoryId"
        id="categoryId"
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get("categoryId")?.toString()}
      >
        <option value="any">Any category</option>
        {categories.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </StampButton>
  );
}
