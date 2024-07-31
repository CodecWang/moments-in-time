import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function LayoutSettings() {
  const [open, setOpen] = useState(false);

  return (
    <div
      id="sidebar"
      className={`w-64 bg-base-100 p-4 border-l border-l-base-300 ${
        open ? "" : "hidden"
      }`}
    >
      <div className="flex flex-row items-center mb-4">
        <button
          className="btn btn-sm btn-circle btn-ghost"
          onClick={() => setOpen(false)}
        >
          <XMarkIcon className="size-4" />
        </button>
        <h6 className="text-sm">Sidebar Content</h6>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Grouped by date</span>
          <input type="checkbox" className="toggle" defaultChecked />
        </label>
      </div>
    </div>
  );
}
