import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="bg-base-200 text-base-content fixed top-0 z-20 flex h-16 w-full justify-center">
      <nav className="navbar bg-base-200">
        <div className="flex-none">
          <label
            htmlFor="drawer"
            className="btn btn-square btn-ghost drawer-button lg:hidden"
          >
            <Bars3Icon className="size-5" />
          </label>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Here Photos</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-ghost btn-circle">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="theme-controller"
                checked={theme !== "dark"}
                onChange={(e) => setTheme(e.target.checked ? "light" : "dark")}
              />

              <SunIcon className="size-5 swap-off" />
              <MoonIcon className="size-5 swap-on" />
            </label>
          </button>
        </div>
      </nav>
    </div>
  );
}
