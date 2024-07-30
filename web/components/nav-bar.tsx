import {
  FolderOpenIcon,
  GlobeAsiaAustraliaIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NavBar() {
  return (
    <ul className="menu menu-horizontal glass fixed bottom-4 rounded-full left-1/2 transform -translate-x-1/2 items-center">
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
        <button className="btn btn-circle btn-ghost">
          <MagnifyingGlassIcon className="size-6" />
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
  );
}
