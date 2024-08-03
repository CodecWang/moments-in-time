import {
  FolderOpenIcon,
  GlobeAsiaAustraliaIcon,
  HeartIcon,
  MapPinIcon,
  PhotoIcon,
  TrashIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SideNav() {
  return (
    <div className="drawer-side h-full">
      <label
        htmlFor="drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content h-full w-64 p-4">
        <ul className="menu menu-lg rounded-box w-56">
          <li>
            <Link className="rounded-full leading-6 text-sm" href="/photos">
              <PhotoIcon className="size-6" />
              Photos
            </Link>
          </li>
          <li>
            <Link className="rounded-full leading-6 text-sm" href="/albums">
              <FolderOpenIcon className="size-6" />
              Albums
            </Link>
          </li>
          <li>
            <Link className="rounded-full leading-6 text-sm" href="/explorer">
              <GlobeAsiaAustraliaIcon className="size-6" />
              Explorer
            </Link>
            <ul>
              <li>
                <Link className="rounded-full leading-6 text-sm" href="/people">
                  <UsersIcon className="size-6" />
                  People
                </Link>
              </li>
              <li>
                <Link className="rounded-full leading-6 text-sm" href="/places">
                  <MapPinIcon className="size-6" />
                  Places
                </Link>
              </li>
              <li>
                <Link
                  className="rounded-full leading-6 text-sm"
                  href="/favorites"
                >
                  <HeartIcon className="size-6" />
                  Favorites
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="rounded-full leading-6 text-sm" href="/my">
              <UserIcon className="size-6" />
              My
            </Link>
          </li>
          <li>
            <Link className="rounded-full leading-6 text-sm" href="/trash">
              <TrashIcon className="size-6" />
              Trash
            </Link>
          </li>
        </ul>
      </ul>
    </div>
  );
}
