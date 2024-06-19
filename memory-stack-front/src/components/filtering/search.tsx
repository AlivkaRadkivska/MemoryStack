"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("categoryId");
    if (value) params.set("search", value);
    else params.delete("search");

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex w-full gap-2 px-3 z-20">
      <input
        className="w-full bg-transparent border-b-2 border-indigo focus:outline-none focus:border-purple px-1"
        type="text"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder={placeholder}
        name="search"
        defaultValue={searchParams.get("search")?.toString()}
        autoFocus
      />

      <input type="submit" value="🔍" className="cursor-pointer px-1" />
    </div>
  );
}
