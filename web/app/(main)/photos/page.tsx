"use client";

import Photos from "@/components/photos";
import { FunnelIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import PhotosView from "./photos-view";
import { useContext } from "react";
import { NavContext } from "../nav-provider";
import { GroupBy, NavMode } from "@/enums";
import { PhotoGroup, PhotosViewSetting } from "@/type";
import { DEFAULT_PHOTOS_VIEW } from "@/constants";
import Upload from "@/components/upload";
import { groupPhotoByDate } from "./utils";

export default function Page({ searchParams }) {
  const { navMode } = useContext(NavContext);
  const [rawPhotos, setRawPhotos] = useState<any[]>([]);
  const [photoGroups, setPhotoGroups] = useState<PhotoGroup[]>([]);
  const [photosView, setPhotosView] =
    useState<PhotosViewSetting>(DEFAULT_PHOTOS_VIEW);

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(searchParams);
      const response = await fetch(`/api/v1/photos?${params.toString()}`);
      const rawPhotos = await response.json();
      setRawPhotos(rawPhotos);
    })();
  }, [searchParams]);

  useEffect(() => {
    if (!rawPhotos.length) return;

    const photos = groupPhotoByDate(rawPhotos, photosView.groupBy);
    setPhotoGroups(photos);
  }, [rawPhotos, photosView]);

  const handleViewChange = (newView: PhotosViewSetting) => {
    setPhotosView((prev) => ({ ...prev, ...newView }));
  };

  return (
    <div className="absolute flex h-full w-full">
      <div className="flex-grow overflow-y-auto sm:pt-3">
        <div className="sticky top-0 z-10 flex h-14 w-full items-center border-b border-gray-300 bg-base-100 px-4 py-2">
          <span className="sm:text-xl">Photos</span>

          <div className="flex flex-1 justify-end">
            {navMode === NavMode.Modern && <Upload />}

            <div className="tooltip tooltip-bottom" data-tip="View">
              <button
                className="btn btn-circle btn-ghost"
                onClick={() => {
                  const sidebar = document.getElementById("sidebar");

                  sidebar.classList.toggle("hidden");
                }}
              >
                <ViewColumnsIcon className="size-5" />
              </button>
            </div>
            <div className="tooltip tooltip-bottom" data-tip="Filter">
              <button className="btn btn-circle btn-ghost">
                <FunnelIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 pt-2">
          <Photos data={photoGroups} view={photosView} />
        </div>
      </div>
      <PhotosView view={photosView} onChange={handleViewChange} />
    </div>
  );
}
