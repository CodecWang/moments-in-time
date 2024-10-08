import DeleteIcon from "@/icons/delete-icon";
import FavoriteIcon from "@/icons/favorite-icon";
import ImageSearchIcon from "@/icons/image-search-icon";
import MapIcon from "@/icons/map-icon";
import PersonSearchIcon from "@/icons/person-search-icon";
import PhotoAlbumIcon from "@/icons/photo-album-icon";
import PhotoIcon from "@/icons/photo-icon";
import ShareIcon from "@/icons/share-icon";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";

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
      icon: ImageSearchIcon,
      href: "/explorer",
    },
    {
      title: "Sharing",
      icon: ShareIcon,
      href: "/my",
    },
    {
      isDivider: true,
    },
    {
      title: "Albums",
      icon: PhotoAlbumIcon,
      href: "/albums",
    },
    {
      title: "People",
      icon: PersonSearchIcon,
      href: "/people",
    },
    {
      title: "Places",
      icon: MapIcon,
      href: "/places",
    },
    {
      title: "Favorites",
      icon: FavoriteIcon,
      href: "/favorites",
    },
    {
      title: "Trash",
      icon: DeleteIcon,
      href: "/trash",
    },
  ];

  return (
    <aside className="drawer-side z-20 h-full">
      <label
        htmlFor="side-nav-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu h-full w-64 bg-base-200 px-3">
        <ul
          className="menu menu-lg w-56"
          onClick={() => {
            document.getElementById("side-nav-drawer").checked = false;
          }}
        >
          {menu.map((item, index) =>
            item.isDivider ? (
              <li key={index} className="menu-title">
                LIBRARY
              </li>
            ) : (
              <li key={index}>
                <Link
                  className={clsx(
                    "rounded-full text-sm leading-6",
                    pathname.startsWith(item.href) && "active",
                  )}
                  href={item.href}
                >
                  <item.icon className="size-6" />
                  <span className="pl-2">{item.title}</span>
                </Link>
              </li>
            ),
          )}
        </ul>
      </ul>
    </aside>
  );
}
