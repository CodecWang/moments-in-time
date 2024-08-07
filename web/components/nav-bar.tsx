import SearchIcon from "@/icons/search-icon";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="glass fixed bottom-4 left-1/2 -translate-x-1/2 transform rounded-full">
      <ul className="menu menu-horizontal flex items-center">
        <li>
          <Link className="rounded-full" href="/photos">
            {/* <PhotoIcon className="size-4" /> */}
            Photos
          </Link>
        </li>
        <li>
          <Link className="rounded-full" href="/albums">
            {/* <FolderOpenIcon className="size-4" /> */}
            Albums
          </Link>
        </li>
        <li>
          <button className="btn btn-circle btn-ghost btn-sm">
            <SearchIcon className="size-5" />
          </button>
        </li>
        <li>
          <Link className="rounded-full" href="/explorer">
            {/* <GlobeAsiaAustraliaIcon className="size-4" /> */}
            Explorer
          </Link>
        </li>
        <li>
          <Link className="rounded-full" href="/my">
            {/* <UserIcon className="size-4" /> */}
            My
          </Link>
        </li>
      </ul>
    </nav>
  );
}
