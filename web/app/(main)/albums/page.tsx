"use client";

import PageHeader from "@/components/page-header";
import { Album } from "@/type";
import { useEffect, useState } from "react";
import CreateAlbumModal from "./create-album-modal";
import AlbumGroup from "./album-group";
import { groupAlbumsByYear } from "./utils";
import { GroupAlbumsBy } from "./type";
import { GroupAlbumsDropdown } from "./group-albums-dropdown";
import { CACHE_KEY } from "@/constants";
import CreateNewFolderIcon from "@/icons/create-new-folder-icon";

export default function Page() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumGroups, setAlbumGroups] = useState<AlbumGroup[]>([]);
  const [groupBy, setGroupBy] = useState<GroupAlbumsBy>(GroupAlbumsBy.None);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/v1/albums`);
      const albums = await response.json();
      setAlbums(albums);
    })();

    const cachedGroupBy = localStorage.getItem(CACHE_KEY.groupAlbumsBy);
    cachedGroupBy && setGroupBy(cachedGroupBy as GroupAlbumsBy);
  }, []);

  useEffect(() => {
    if (!albums.length) return;

    switch (groupBy) {
      case GroupAlbumsBy.None:
        setAlbumGroups([{ title: "", count: albums.length, albums }]);
        break;
      case GroupAlbumsBy.Year:
        const albumGroups = groupAlbumsByYear(albums);
        setAlbumGroups(albumGroups);
        break;
      case GroupAlbumsBy.Owner:
        break;
    }
  }, [albums, groupBy]);

  const handleGroupByChange = (groupBy: GroupAlbumsBy) => {
    setGroupBy(groupBy);
    localStorage.setItem(CACHE_KEY.groupAlbumsBy, groupBy);
  };

  return (
    <div className="flex-grow overflow-auto">
      <PageHeader title="Albums">
        <div className="tooltip tooltip-bottom" data-tip="Create album">
          <button
            className="btn btn-ghost"
            onClick={() =>
              document.getElementById("create-album-modal").showModal()
            }
          >
            <CreateNewFolderIcon className="size-6 md:size-5" />
            <span className="hidden md:inline">Create album</span>
          </button>
        </div>

        <GroupAlbumsDropdown groupBy={groupBy} onChange={handleGroupByChange} />
      </PageHeader>

      <div className="px-4 pt-2">
        {albumGroups.map((group, index) => (
          <AlbumGroup
            key={index}
            title={group.title}
            count={group.count}
            albums={group.albums}
          />
        ))}
      </div>

      <CreateAlbumModal />
    </div>
  );
}
