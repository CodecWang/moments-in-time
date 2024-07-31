import Header from "@/components/header";
import NavBar from "@/components/nav-bar";
import SideNav from "@/components/side-nav";
import { createContext, ReactNode, useState } from "react";

enum NavMode {
  Traditional,
  Modern,
}

export const NavContext = createContext({
  navMode: NavMode.Modern,
  setNavMode: (_mode: NavMode) => {},
});

export const NavProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [navMode, setNavMode] = useState(NavMode.Modern);

  return (
    <NavContext.Provider value={{ navMode, setNavMode }}>
      {navMode === NavMode.Modern ? (
        <>
          {children}
          <NavBar />
        </>
      ) : (
        <div className="h-lvh flex flex-col">
          <Header />
          <div className="flex-grow pt-16">
            <div className="drawer bg-base-100 lg:drawer-open overflow-hidden">
              <input id="drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">{children}</div>
              <SideNav />
            </div>
          </div>
        </div>
      )}
    </NavContext.Provider>
  );
};
