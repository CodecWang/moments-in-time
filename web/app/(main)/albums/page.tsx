"use client";

import { Album } from "@/type";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      <h1>Albums Page</h1>

      <div className="flex">
        {albums.map((album, index) => (
          <Link href={`/album/${album.id}`} key={index}>
            <div className="card w-96 bg-base-100 shadow-xl">
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
