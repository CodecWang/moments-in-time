import justifiedLayout from "justified-layout";
import { Photo } from "./photo";
import { useEffect, useRef, useState } from "react";

interface PhotosProps {
  data: any[];
}

export default function Photos({ data }: PhotosProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(null);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const container = wrapRef.current;
  //     console.log(container);
  //     if (!container) return;

  //     const ele = container.getBoundingClientRect();
  //     setViewportWidth(ele.width);
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

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
      {data.map(({ date, photos }) => (
        <PhotoGroup
          key={date}
          date={date}
          photos={photos}
          viewportWidth={viewportWidth}
          onClick={(photo) => handlePhotoClick(photo)}
          onSelect={(selected) => setSelectedPhotos(selected)}
        />
      ))}
    </div>
  );
}

interface PhotoGroupProps {
  date: string;
  photos: Photo[];
  viewportWidth: number;
  onClick: (photo: Photo) => void;
  onSelect: (photo: Photo) => void;
}

function PhotoGroup({
  date,
  photos,
  viewportWidth,
  onClick,
  onSelect,
}: PhotoGroupProps) {
  const layout = justifiedLayout(
    photos.map((photo) => photo.thumbnails[0]),
    {
      containerWidth: viewportWidth,
      containerPadding: 0,
      boxSpacing: { horizontal: 2, vertical: 2 },
      targetRowHeight: 220,
      // targetRowHeightTolerance: 0,
      // forceAspectRatio: 1,
      // fullWidthBreakoutRowCadence: 2
    }
  );

  return (
    <div>
      <div className="flex h-12 items-center text-sm">
        <span>{date}</span>
      </div>
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
