"use client";

import { useContext } from "react";
import { NavContext } from "../nav-provider";

import { useTheme } from "next-themes";

export default function Page() {
  const { navMode, setNavMode } = useContext(NavContext);
  const { theme, setTheme } = useTheme();

  const handleChange = (e) => {
    setNavMode(e.target.checked ? 1 : 0);
  };

  return (
    <div>
      <h1>My Page</h1>

      <div className="form-control w-56">
        <label className="label cursor-pointer">
          <span className="label-text">Modern Navigation</span>
          <input
            type="checkbox"
            className="toggle"
            checked={Boolean(navMode)}
            onChange={handleChange}
          />
        </label>

        <button className="btn" onClick={() => setTheme("light")}>
          light
        </button>
        <button className="btn" onClick={() => setTheme("system")}>
          system
        </button>
        <button className="btn" onClick={() => setTheme("dark")}>
          dark
        </button>
      </div>
    </div>
  );
}
