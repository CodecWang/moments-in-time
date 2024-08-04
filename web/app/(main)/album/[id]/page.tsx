"use client";
import Photos from "@/components/photos";
import { DEFAULT_PHOTOS_VIEW } from "@/constants";
import { Album, PhotoGroup, PhotosViewSetting } from "@/type";
import { useEffect, useState } from "react";
import { groupPhotoByDate } from "../../photos/utils";

export default function Page({ params }: { params: { id: string } }) {
  const [album, setAlbum] = useState<Album>();
  const [photoGroups, setPhotoGroups] = useState<PhotoGroup[]>([]);
  const [photosView, setPhotosView] =
    useState<PhotosViewSetting>(DEFAULT_PHOTOS_VIEW);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/v1/albums/${params.id}/photos`);
      const album = await response.json();
      setAlbum(album);
    })();
  }, [params.id]);

  useEffect(() => {
    if (!album || !album.photos.length) return;

    const photos = groupPhotoByDate(album.photos, photosView.groupBy);
    setPhotoGroups(photos);
  }, [album, photosView]);

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{album.title}</h2>
      <div className="px-4 pt-2">
        <Photos data={photoGroups} view={photosView} />
      </div>
    </div>
  );
}
