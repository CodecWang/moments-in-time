import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

interface AlbumGroupProps {
  title: string;
  count: number;
  albums: Album[];
}

export default function AlbumGroup({ title, count, albums }: AlbumGroupProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      {title && count && (
        <div className="w-full border-b border-b-blue-100">
          <button
            className="btn btn-ghost flex items-center"
            onClick={toggleCollapse}
          >
            <ChevronRightIcon
              className={`-mt-2.5 inline-block size-6 ${isCollapsed ? "rotate-0" : "rotate-90"} transition-all duration-[250ms]`}
            />
            <span className="text-3xl">{title}</span>
            <span>{count} albums</span>
          </button>
        </div>
      )}

      {!isCollapsed && (
        <div className="flex flex-wrap">
          {albums.map((album, index) => (
            <Link href={`/albums/${album.id}`} key={index}>
              <div className="card m-4 w-96 bg-base-100 shadow-xl">
                <figure>
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    src={
                      album.cover
                        ? `/api/v1/photos/${album.cover.id}/thumbnail?variant=2`
                        : ""
                    }
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
      )}
    </div>
  );
}
