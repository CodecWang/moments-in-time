import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function Upload() {
  return (
    <div className="tooltip tooltip-bottom" data-tip="Upload photos">
      <button className="btn btn-ghost">
        <ArrowUpTrayIcon className="size-6 md:size-5" />
        <span className="hidden md:inline">Upload</span>
      </button>
    </div>
  );
}
