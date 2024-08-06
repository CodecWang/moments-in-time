import {
  ArrowUpTrayIcon,
  Bars3Icon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import Upload from "./upload";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 z-20 flex h-16 w-full justify-center bg-base-200 text-base-content">
      <nav className="navbar bg-base-200">
        <div className="flex-none">
          <label
            htmlFor="side-nav-drawer"
            className="btn btn-square btn-ghost drawer-button lg:hidden"
          >
            <Bars3Icon className="size-6" />
          </label>
        </div>
        <div className="flex-1">
          <a className="text-xl">Here Photos</a>
        </div>
        <div className="flex-none">
          <Upload />

          <div
            className="tooltip tooltip-bottom"
            data-tip={theme === "dark" ? "Light" : "Dark"}
          >
            <button className="btn btn-circle btn-ghost">
              <label className="swap swap-rotate">
                <input
                  type="checkbox"
                  className="theme-controller"
                  checked={theme !== "dark"}
                  onChange={(e) => {
                    console.log(e.target.checked, theme);

                    setTheme(e.target.checked ? "light" : "dark");
                  }}
                />
                <SunIcon className="swap-off size-6" />
                <MoonIcon className="swap-on size-6" />
              </label>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
