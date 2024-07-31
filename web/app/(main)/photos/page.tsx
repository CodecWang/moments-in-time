"use client";

import Photos from "@/components/photos";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import LayoutSettings from "./layout-settings";

enum GroupedBy {
  NoGroup,
  Day,
  Month,
  Year,
}

export default function Page() {
  const [rawPhotos, setRawPhotos] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [groupedBy, setGroupedBy] = useState(GroupedBy.Day);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/photos");
      const rawPhotos = await response.json();
      setRawPhotos(rawPhotos);
    })();
  }, []);

  useEffect(() => {
    if (!rawPhotos.length) return;
    if (groupedBy === GroupedBy.NoGroup) return setPhotos(rawPhotos);

    const groupedPhotos = rawPhotos.reduce(
      (acc: { [key: string]: Photo[] }, photo) => {
        const dateObj = new Date(photo.shotTime);

        let options = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        };

        switch (groupedBy) {
          case GroupedBy.Year:
            options = { year: "numeric" };
            break;
          case GroupedBy.Month:
            options = { year: "numeric", month: "short" };
            break;
          case GroupedBy.Day:
          default:
            break;
        }

        const date = dateObj.toLocaleDateString("en-US", options);

        if (!acc[date]) acc[date] = [];
        acc[date].push(photo);
        return acc;
      },
      {}
    );
    const photos = Object.keys(groupedPhotos).map((date) => ({
      date,
      photos: groupedPhotos[date],
    }));

    setPhotos(photos);
  }, [rawPhotos, groupedBy]);

  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="bg-base-100 p-2 text-base-content sticky top-0 z-10 flex w-full h-16 bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] border-b border-b-base-300">
          <div className="prose flex items-center px-4">
            <h3>Photos</h3>
          </div>

          <div className="join m-auto">
            <input
              className="join-item btn"
              type="radio"
              name="options"
              onChange={() => setGroupedBy(GroupedBy.Day)}
              aria-label="Day"
            />
            <input
              className="join-item btn"
              type="radio"
              name="options"
              onChange={() => setGroupedBy(GroupedBy.Month)}
              aria-label="Month"
            />
            <input
              className="join-item btn"
              type="radio"
              name="options"
              onChange={() => setGroupedBy(GroupedBy.Year)}
              aria-label="Year"
            />
          </div>

          <button className="btn btn-ghost">
            <ArrowUpTrayIcon className="size-4" />
            Upload
          </button>
          <button className="btn btn-circle btn-ghost">
            <ViewColumnsIcon className="size-5" />
          </button>
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => {
              const sidebar = document.getElementById("sidebar");

              sidebar.classList.toggle("hidden");
            }}
          >
            <FunnelIcon className="size-5" />
          </button>
        </div>

        <div className="px-4 pt-2">
          <Photos data={photos} />
        </div>
      </div>
      <LayoutSettings />
    </div>
  );
}
