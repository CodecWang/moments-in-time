import justifiedLayout from "justified-layout";
import { Photo } from "./photo";
import { useEffect, useRef, useState } from "react";
import { PhotosViewSetting } from "@/type";

interface PhotosProps {
  data: PhotoGroup[];
  viewSettings: PhotosViewSetting;
}

export default function Photos({ data, viewSettings }: PhotosProps) {
  console.log(data);

  const wrapRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(null);

  useEffect(() => {
    const handleResize = (entries) => {
      console.log(entries);

      for (let entry of entries) {
        setViewportWidth(entry.contentRect.width);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (wrapRef.current) {
      resizeObserver.observe(wrapRef.current);
    }

    return () => {
      if (wrapRef.current) {
        resizeObserver.unobserve(wrapRef.current);
      }
    };
  }, []);

  if (!viewportWidth || !data.length) {
    return <div ref={wrapRef}>No photos</div>;
  }

  return (
    <div ref={wrapRef}>
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
      <div
        style={{
          height: layout.containerHeight,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {layout.boxes.map(({ width, height, top, left }, index) => (
          <Photo
            photo={photos[index]}
            style={{ top, left, position: "absolute" }}
            key={photos[index].id}
            src={`/api/v1/photos/${photos[index].id}/thumbnail?variant=2`}
            width={width}
            height={height}
            top={top}
            left={left}
            index={index}
            onClick={onClick}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
