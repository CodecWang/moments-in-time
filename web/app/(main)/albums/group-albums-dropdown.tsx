import { FolderPlusIcon } from "@heroicons/react/24/outline";
import { MouseEventHandler } from "react";
import { GroupAlbumsBy } from "./type";

interface GroupAlbumsDropdownProps {
  groupBy: GroupAlbumsBy;
  onChange: (value: GroupAlbumsBy) => void;
}

export function GroupAlbumsDropdown({
  groupBy,
  onChange,
}: GroupAlbumsDropdownProps) {
  const handleGroupByChange: MouseEventHandler<HTMLUListElement> = (e) => {
    const value = (e.target as HTMLAnchorElement).getAttribute("data-value");
    value && onChange(value as GroupAlbumsBy);
    e.currentTarget.blur();
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost m-1">
        <FolderPlusIcon className="size-6 md:size-5" />
        {groupBy}
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-52 rounded-box bg-base-200 p-2 shadow"
        onClick={handleGroupByChange}
      >
        {Object.values(GroupAlbumsBy).map((value) => (
          <li key={value}>
            <a className={groupBy === value ? "active" : ""} data-value={value}>
              {value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
