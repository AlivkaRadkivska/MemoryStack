import Link from "next/link";

export default function MenuPage() {
  return (
    <>
      <div className="flex flex-col items-center">
        <Link href="/photos">Photos</Link>
        <Link href="/notes">Notes</Link>
        <Link href="/categories">Categories</Link>
      </div>
      <div className="flex flex-col items-center">
        <Link href="/signin">Sign in</Link>
        <Link href="/signup">Sign up</Link>
      </div>
      <div>
        Menu page
      </div>
    </>
  )
}
