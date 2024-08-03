"use client";

import Photos from "@/components/photos";
import {
  ArrowUpTrayIcon,
  FunnelIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import LayoutSettings from "./photos-view";
import { useContext } from "react";
import { NavContext } from "../nav-provider";
import { GroupedBy } from "@/enums";
import { PhotosViewSetting } from "@/type";
import { defaultPhotosViewSetting } from "@/constants";

export default function Page() {
  const { navMode } = useContext(NavContext);
  const [rawPhotos, setRawPhotos] = useState<any[]>([]);
  const [photoGroups, setPhotoGroups] = useState<PhotoGroup[]>([]);
  const [photosViewSetting, setPhotosViewSetting] = useState<PhotosViewSetting>(
    defaultPhotosViewSetting,
  );

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/photos");
      const rawPhotos = await response.json();
      setRawPhotos(rawPhotos);
    })();
  }, []);

  useEffect(() => {
    if (!rawPhotos.length) return;
    if (photosViewSetting.groupBy === GroupedBy.NoGroup)
      return setPhotoGroups([
        {
          title: "",
          photos: rawPhotos,
        },
      ]);

    const groupedPhotos = rawPhotos.reduce(
      (acc: { [key: string]: Photo[] }, photo) => {
        const dateObj = new Date(photo.shotTime);

        let options = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        };

        switch (photosViewSetting.groupBy) {
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
      {},
    );
    const photos = Object.keys(groupedPhotos).map((date) => ({
      title: date,
      photos: groupedPhotos[date],
    }));

    setPhotoGroups(photos);
  }, [rawPhotos, photosViewSetting]);

  return (
    <div className="absolute flex h-full w-full">
      <div className="flex-grow overflow-y-auto sm:pt-3">
        <div className="sticky top-0 z-10 flex h-14 w-full items-center border-b border-gray-300 bg-base-100 px-4 py-2">
          <span className="sm:text-xl">Photos</span>

          <div className="flex flex-1 justify-end">
            {navMode === 0 && (
              <button className="btn btn-ghost">
                <ArrowUpTrayIcon className="size-5" />
                Upload
              </button>
            )}

            <button className="btn btn-ghost">
              <ViewColumnsIcon className="size-5" /> Zen Mode
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
        </div>

        <div className="px-4 pt-2">
          <Photos data={photoGroups} viewSettings={photosViewSetting} />
        </div>
      </div>
      <LayoutSettings
        settings={photosViewSetting}
        onChange={(newSettings) => {
          setPhotosViewSetting((prev) => ({ ...prev, ...newSettings }));
        }}
      />
    </div>
  );
}
