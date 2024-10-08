import { useState } from "react";
import { PhotosViewSetting } from "@/type";
import { DEFAULT_PHOTOS_VIEW } from "@/constants";
import { GalleryLayout, GroupBy } from "@/enums";
import { clsx } from "clsx";

interface PhotosViewProps {
  onChange: (newSettings: PhotosViewSetting) => void;
  view: PhotosViewSetting;
}

export default function PhotosView({ view, onChange }: PhotosViewProps) {
  const [open, setOpen] = useState(false);

  return (
    <aside
      id="sidebar"
      className={clsx(
        "w-72 overflow-y-auto border-l border-l-gray-300 bg-base-100 p-4",
        !open && "hidden",
      )}
    >
      {/* <div className="flex h-14 flex-row items-center border-b border-gray-300 px-4 py-2">
        <span className="text-base sm:text-xl">View setting</span>
      </div> */}
      <div>
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Photo Layout
        </label>
        <div className="join m-auto mt-2">
          <input
            className="btn btn-ghost btn-outline join-item"
            type="radio"
            name="options"
            checked={view.layout === GalleryLayout.Grid}
            onChange={() => onChange({ layout: GalleryLayout.Grid })}
            aria-label="Grid"
          />
          <input
            className="btn btn-ghost btn-outline join-item"
            type="radio"
            name="options"
            checked={view.layout === GalleryLayout.Grid1x1}
            onChange={() => onChange({ layout: GalleryLayout.Grid1x1 })}
            aria-label="Grid(1:1)"
          />
          <input
            className="btn btn-ghost btn-outline join-item"
            type="radio"
            name="options"
            checked={view.layout === GalleryLayout.Justified}
            onChange={() => onChange({ layout: GalleryLayout.Justified })}
            aria-label="Justified"
          />
          <input
            className="btn btn-ghost btn-outline join-item"
            type="radio"
            name="options"
            checked={view.layout === GalleryLayout.Masonry}
            onChange={() => onChange({ layout: GalleryLayout.Masonry })}
            aria-label="Masonry"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Group
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            defaultChecked
            className="checkbox"
            checked={view.groupBy !== GroupBy.NoGroup}
            onChange={(e) => {
              onChange({
                groupBy: e.target.checked ? GroupBy.Day : GroupBy.NoGroup,
              });
            }}
          />
          <span className="label-text">Group by date</span>
        </label>

        <div className="join m-auto mt-2">
          <input
            className="btn btn-ghost btn-outline join-item"
            type="radio"
            name="options"
            checked={view.groupBy === GroupBy.Day}
            onChange={() => onChange({ groupBy: GroupBy.Day })}
            aria-label="Day"
          />
          <input
            className="btn btn-ghost btn-outline join-item"
            type="radio"
            name="options"
            checked={view.groupBy === GroupBy.Month}
            onChange={() => onChange({ groupBy: GroupBy.Month })}
            aria-label="Month"
          />
          <input
            className="btn btn-ghost btn-outline join-item"
            type="radio"
            name="options"
            checked={view.groupBy === GroupBy.Year}
            onChange={() => onChange({ groupBy: GroupBy.Year })}
            aria-label="Year"
          />
        </div>
      </div>

      <input
        type="range"
        min={100}
        max="500"
        value={view.size}
        className="range"
        onChange={(e) => onChange({ size: parseInt(e.currentTarget.value) })}
      />

      <input
        type="range"
        min={0}
        max="48"
        value={view.spacing}
        className="range"
        onChange={(e) => onChange({ spacing: parseInt(e.currentTarget.value) })}
      />

      <button className="btn" onClick={() => onChange(DEFAULT_PHOTOS_VIEW)}>
        Set to default
      </button>
    </aside>
  );
}
