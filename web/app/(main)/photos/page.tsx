"use client";

import Photos from "@/components/photos";
import { useEffect, useState } from "react";
import PhotosView from "../../../components/photos-view";
import { useContext } from "react";
import { NavContext } from "../nav-provider";
import { NavMode } from "@/enums";
import { PhotoGroup, PhotosViewSetting } from "@/type";
import { DEFAULT_PHOTOS_VIEW } from "@/constants";
import Upload from "@/components/upload";
import { groupPhotoByDate } from "./utils";
import PageHeader from "@/components/page-header";
import { useRouter } from "next/navigation";
import TuneIcon from "@/icons/tune-icon";
import FilterAltIcon from "@/icons/filter-alt-icon";

export default function Page({ searchParams }) {
  const router = useRouter();
  console.log(">>>>", router, router.pathname);
  const { navMode } = useContext(NavContext);
  const [photos, setPhotos] = useState<any[]>([]);
  const [photoGroups, setPhotoGroups] = useState<PhotoGroup[]>([]);
  const [photosView, setPhotosView] =
    useState<PhotosViewSetting>(DEFAULT_PHOTOS_VIEW);

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(searchParams);
      const response = await fetch(`/api/v1/photos?${params.toString()}`);
      const rawPhotos = await response.json();
      setPhotos(rawPhotos);
    })();
  }, [searchParams]);

  useEffect(() => {
    if (!photos.length) return;

    const photoGroups = groupPhotoByDate(photos, photosView.groupBy);
    setPhotoGroups(photoGroups);
  }, [photos, photosView]);

  const handleViewChange = (newView: PhotosViewSetting) => {
    setPhotosView((prev) => ({ ...prev, ...newView }));
  };

  return (
    // <div className="absolute flex h-full w-full">
    // <div className="flex-grow overflow-y-auto sm:pt-3">

    <>
      <div className="flex-grow overflow-auto">
        <PageHeader title="Photos">
          {navMode === NavMode.Modern && <Upload />}

          <div className="tooltip tooltip-bottom" data-tip="Layout setting">
            <button
              className="btn btn-circle btn-ghost"
              onClick={() => {
                const sidebar = document.getElementById("sidebar");

                sidebar.classList.toggle("hidden");
              }}
            >
              <TuneIcon className="size-5" />
            </button>
          </div>
          <div className="tooltip tooltip-bottom" data-tip="Filter">
            <button className="btn btn-circle btn-ghost">
              <FilterAltIcon className="size-5" />
            </button>
          </div>
        </PageHeader>

        <div className="flex">
          <div className="flex-grow px-4 pt-2">
            <Photos data={photoGroups} view={photosView} />
          </div>
        </div>
      </div>
      <PhotosView view={photosView} onChange={handleViewChange} />
    </>

    // </div>
  );
}
