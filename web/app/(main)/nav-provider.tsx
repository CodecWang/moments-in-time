import Header from "@/components/header";
import NavBar from "@/components/nav-bar";
import SideNav from "@/components/side-nav";
import { NavMode } from "@/enums";
import { createContext, ReactNode, useState } from "react";

export const NavContext = createContext({
  navMode: NavMode.Modern,
  setNavMode: (_mode: NavMode) => {},
});

function getNavMode() {
  if (typeof window !== "undefined") {
    const mode = localStorage.getItem("nav-mode");
    if (mode) {
      return parseInt(mode);
    }
  }
  return NavMode.Modern;
}

interface NavProviderProps {}

export const NavProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [navMode, setNavModeState] = useState(getNavMode());

  const setNavMode = (mode: NavMode) => {
    setNavModeState(mode);
    localStorage.setItem("nav-mode", mode.toString());
  };

  const providerValue = {
    navMode,
    setNavMode,
  };

  const ModernLayout = () => {
    return (
      <main className="absolute flex h-full w-full overflow-hidden">
        {children}
        <NavBar />
      </main>
    );
  };

  const TraditionalLayout = () => {
    return (
      <div className="flex h-lvh flex-col">
        <Header />
        <main className="drawer h-full flex-grow overflow-hidden bg-base-100 pt-16 lg:drawer-open">
          <input
            id="side-nav-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <section className="drawer-content relative">
            <div className="absolute flex h-full w-full overflow-hidden">
              {children}
            </div>
          </section>
          <SideNav />
        </main>
      </div>
    );
  };

  return (
    <NavContext.Provider value={providerValue}>
      {navMode === NavMode.Modern ? <ModernLayout /> : <TraditionalLayout />}
    </NavContext.Provider>
  );
};
