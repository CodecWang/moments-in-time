import Link from "next/link";

export default function SideNav() {
  return (
    <div className="drawer-side">
      <label
        htmlFor="drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <ul className="menu rounded-box w-56">
          <li>
            <Link className="rounded-full" href="/photos">
              Photos
            </Link>
          </li>
          <li>
            <Link className="rounded-full" href="/albums">
              Albums
            </Link>
          </li>
          <li>
            <Link className="rounded-full" href="/explorer">
              Explorer
            </Link>
            <ul>
              <li>
                <Link className="rounded-full" href="/people">
                  People
                </Link>
              </li>
              <li>
                <Link className="rounded-full" href="/places">
                  Places
                </Link>
              </li>
              <li>
                <Link className="rounded-full" href="/favorites">
                  Favorites
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="rounded-full" href="/my">
              My
            </Link>
          </li>
          <li>
            <Link className="rounded-full" href="/trash">
              Trash
            </Link>
          </li>
        </ul>
      </ul>
    </div>
  );
}
