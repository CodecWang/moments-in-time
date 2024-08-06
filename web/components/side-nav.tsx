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
import { usePathname, useRouter } from "next/navigation";

export default function SideNav(params) {
  const router = useRouter();
  const pathname = usePathname();
  console.log("hhh", params, router, router.pathname, pathname);

  const menu = [
    {
      title: "Photos",
      icon: PhotoIcon,
      href: "/photos",
    },
    {
      title: "Explorer",
      icon: GlobeAsiaAustraliaIcon,
      href: "/explorer",
    },
    {
      title: "Sharing",
      icon: UserIcon,
      href: "/sharing",
    },
    {
      isDivider: true,
    },
    {
      title: "Albums",
      icon: FolderOpenIcon,
      href: "/albums",
    },
    {
      title: "People",
      icon: UsersIcon,
      href: "/people",
    },
    {
      title: "Places",
      icon: MapPinIcon,
      href: "/places",
    },
    {
      title: "Favorites",
      icon: HeartIcon,
      href: "/favorites",
    },
    {
      title: "Trash",
      icon: TrashIcon,
      href: "/trash",
    },
  ];

  const libMenu = [];

  return (
    <aside className="drawer-side z-20 h-full">
      <label
        htmlFor="side-nav-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu h-full w-64 bg-base-200 px-4">
        <ul className="menu menu-lg w-56">
          {menu.map((item, index) =>
            item.isDivider ? (
              <li key={index} className="menu-title">
                LIBRARY
              </li>
            ) : (
              <li key={index}>
                <Link
                  className={`rounded-full text-sm leading-6 ${pathname.startsWith(item.href) ? "active" : ""}`}
                  href={item.href}
                >
                  <item.icon className="size-6" />
                  {item.title}
                </Link>
              </li>
            ),
          )}
        </ul>
      </ul>
    </aside>
  );
}
