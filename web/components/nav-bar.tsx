import Link from "next/link";

export default function NavBar() {
  return (
    <ul className="menu menu-horizontal bg-base-200 fixed bottom-4 rounded-full left-1/2 transform -translate-x-1/2 items-center">
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
        <button className="btn btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </li>
      <li>
        <Link className="rounded-full" href="/explorer">
          Explorer
        </Link>
      </li>
      <li>
        <Link className="rounded-full" href="/my">
          My
        </Link>
      </li>
    </ul>
  );
}
