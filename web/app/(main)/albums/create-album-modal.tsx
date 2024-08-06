import { useState } from "react";

enum AlbumType {
  Album,
  SmartAlbum,
}

export default function CreateAlbumModal() {
  const [albumType, setAlbumType] = useState<AlbumType>(AlbumType.Album);

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/v1/albums`, {
      method: "POST",
      body: JSON.stringify({
        title: "香港游",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const album = await response.json();
    console.log("create succeeded", album);

    document.getElementById("my_modal_5").hideModal();
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box flex flex-col">
        <div className="join self-center">
          <input
            className="btn join-item"
            type="radio"
            name="options"
            aria-label="Album"
            checked={albumType === AlbumType.Album}
            onChange={() => setAlbumType(AlbumType.Album)}
          />
          <input
            className="btn join-item"
            type="radio"
            name="options"
            aria-label="Smart Album"
            checked={albumType === AlbumType.SmartAlbum}
            onChange={() => setAlbumType(AlbumType.SmartAlbum)}
          />
        </div>
        <div className="py-4">
          {albumType === AlbumType.Album ? (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Album name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          ) : (
            <div>
              Create smart album
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Album name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Album name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Album name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Album name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Album name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
          )}
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
            <button className="btn" onClick={handleCreateAlbum}>
              Confirm
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
