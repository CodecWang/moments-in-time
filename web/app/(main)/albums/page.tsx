"use client";

import PageHeader from "@/components/page-header";
import { Album } from "@/type";
import { ArrowUpTrayIcon, FolderPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import CreateAlbumModal from "./create-album-modal";

export default function Page() {
  const [albums, setAlbums] = useState<Album[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/v1/albums`);
      const albums = await response.json();
      setAlbums(albums);
    })();
  }, []);

  return (
    <div>
      <CreateAlbumModal />
      <PageHeader title="Albums">
        <div className="tooltip tooltip-bottom" data-tip="Create album">
          <button
            className="btn btn-ghost"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <FolderPlusIcon className="size-6 md:size-5" />
            <span className="hidden md:inline">Create album</span>
          </button>
        </div>
      </PageHeader>

      <div className="flex">
        {albums.map((album, index) => (
          <Link href={`/album/${album.id}`} key={index}>
            <div className="card m-4 w-96 bg-base-100 shadow-xl">
              <figure>
                <img
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  src={
                    album.cover
                      ? `/api/v1/photos/${album.cover.id}/thumbnail?variant=2`
                      : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  }
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{album.title}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
