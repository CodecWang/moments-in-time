import justifiedLayout from "justified-layout";
import { Photo } from "./photo";
import { useEffect, useRef, useState } from "react";
import { PhotosViewSetting } from "@/type";
import Image from "next/image";
import { GalleryLayout } from "@/enums";

interface PhotosProps {
  data: PhotoGroup[];
  view: PhotosViewSetting;
}

export default function Photos({ data, view: viewSettings }: PhotosProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setViewportWidth(entry.contentRect.width);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    const currentViewportRef = viewportRef.current;

    if (currentViewportRef) {
      resizeObserver.observe(currentViewportRef);
    }

    return () => {
      if (currentViewportRef) {
        resizeObserver.unobserve(currentViewportRef);
      }
    };
  }, []);

  if (!viewportWidth || !data.length) {
    return <div ref={viewportRef}>No photos</div>;
  }

  return (
    <div ref={viewportRef}>
      {data.map(({ title, photos }, index) => (
        <PhotoGroup
          key={index}
          title={title}
          photos={photos}
          viewSettings={viewSettings}
          viewportWidth={viewportWidth}
          onClick={(photo) => handlePhotoClick(photo)}
          onSelect={(selected) => setSelectedPhotos(selected)}
        />
      ))}
    </div>
  );
}

interface PhotoGroupProps {
  title?: string;
  photos: Photo[];
  viewSettings: PhotosView;
  viewportWidth: number;
  onClick: (photo: Photo) => void;
  onSelect: (photo: Photo) => void;
}

function PhotoGroup({
  title,
  photos,
  viewportWidth,
  viewSettings,
  onClick,
  onSelect,
}: PhotoGroupProps) {
  const layout = justifiedLayout(
    photos.map((photo) => photo.thumbnails[0]),
    {
      containerWidth: viewportWidth,
      containerPadding: 0,
      boxSpacing: {
        horizontal: viewSettings.spacing,
        vertical: viewSettings.spacing,
      },
      targetRowHeight: viewSettings.size,
      // targetRowHeightTolerance: 0,
      // forceAspectRatio: 1,
      // fullWidthBreakoutRowCadence: 2
    },
  );

  return (
    <div>
      {title && (
        <div className="flex h-12 items-center text-sm">
          <span>{title}</span>
        </div>
      )}

      {viewSettings.layout === GalleryLayout.Justified && (
        <div
          className="relative overflow-hidden"
          style={{ height: layout.containerHeight }}
        >
          {layout.boxes.map(({ width, height, top, left }, index) => (
            <Photo
              photo={photos[index]}
              key={photos[index].id}
              src={`/api/v1/photos/${photos[index].id}/thumbnail?variant=2`}
              width={width}
              height={height}
              top={top}
              left={left}
              onClick={onClick}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}

      {(viewSettings.layout === GalleryLayout.Grid ||
        viewSettings.layout === GalleryLayout.Grid1x1) && (
        <div className="grid grid-cols-4" style={{ gap: viewSettings.spacing }}>
          {photos.map((photo) => (
            <div
              key={photo.id}
              style={{ width: viewportWidth / 4, height: viewportWidth / 4 }}
            >
              <Image
                style={{
                  width: viewportWidth / 4,
                  height: viewportWidth / 4,
                  objectFit:
                    viewSettings.layout === GalleryLayout.Grid1x1
                      ? "cover"
                      : "contain",
                }}
                src={`/api/v1/photos/${photo.id}/thumbnail?variant=2`}
                width={viewportWidth / 4}
                height={viewportWidth / 4}
                alt=""
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
