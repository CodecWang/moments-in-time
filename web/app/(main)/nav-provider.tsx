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

  return (
    <NavContext.Provider value={providerValue}>
      {navMode === NavMode.Modern ? (
        <>
          {children}
          <NavBar />
        </>
      ) : (
        <div className="flex h-lvh flex-col">
          <Header />
          <div className="flex-grow pt-16">
            <div className="drawer h-full overflow-hidden bg-base-100 lg:drawer-open">
              <input id="drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content relative">{children}</div>
              <SideNav />
            </div>
          </div>
        </div>
      )}
    </NavContext.Provider>
  );
};
