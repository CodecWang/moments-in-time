import { useState } from "react";
import { PhotosViewSetting } from "@/type";
import { defaultPhotosViewSetting } from "@/constants";
import { GroupedBy } from "@/enums";

interface PhotosViewProps {
  onChange: (newSettings: PhotosViewSetting) => void;
  settings: PhotosViewSetting;
}

export default function PhotosView({ settings, onChange }: PhotosViewProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      id="sidebar"
      className={`w-72 overflow-y-auto border-l border-l-gray-300 bg-base-100 sm:pt-3 ${
        open ? "hidden" : ""
      }`}
    >
      <div className="flex h-14 flex-row items-center border-b border-gray-300 px-4 py-2">
        <span className="text-base sm:text-xl">View settings</span>
      </div>
      <div className="p-4">
        <div className="border-b border-gray-900/10 pb-12">
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
                onChange={() => setGroupedBy(GroupedBy.Day)}
                aria-label="Grid"
              />
              <input
                className="btn btn-ghost btn-outline join-item"
                type="radio"
                name="options"
                onChange={() => setGroupedBy(GroupedBy.Month)}
                aria-label="Justified"
              />
              <input
                className="btn btn-ghost btn-outline join-item"
                type="radio"
                name="options"
                onChange={() => setGroupedBy(GroupedBy.Year)}
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
                checked={settings.groupBy !== GroupedBy.NoGroup}
                onChange={(e) => {
                  onChange({
                    groupBy: e.target.checked
                      ? GroupedBy.Day
                      : GroupedBy.NoGroup,
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
                checked={settings.groupBy === GroupedBy.Day}
                onChange={() => onChange({ groupBy: GroupedBy.Day })}
                aria-label="Day"
              />
              <input
                className="btn btn-ghost btn-outline join-item"
                type="radio"
                name="options"
                checked={settings.groupBy === GroupedBy.Month}
                onChange={() => onChange({ groupBy: GroupedBy.Month })}
                aria-label="Month"
              />
              <input
                className="btn btn-ghost btn-outline join-item"
                type="radio"
                name="options"
                checked={settings.groupBy === GroupedBy.Year}
                onChange={() => onChange({ groupBy: GroupedBy.Year })}
                aria-label="Year"
              />
            </div>
          </div>

          <input
            type="range"
            min={100}
            max="500"
            value={settings.size}
            className="range"
            onChange={(e) =>
              onChange({ size: parseInt(e.currentTarget.value) })
            }
          />

          <input
            type="range"
            min={0}
            max="48"
            value={settings.spacing}
            className="range"
            onChange={(e) =>
              onChange({ spacing: parseInt(e.currentTarget.value) })
            }
          />

          <button
            className="btn"
            onClick={() => onChange(defaultPhotosViewSetting)}
          >
            Set to default
          </button>
        </div>
      </div>
    </div>
  );
}
