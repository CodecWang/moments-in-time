import justifiedLayout from "justified-layout";
import "./page.module.css";
import { Photo } from "../photo/page";

interface PhotoGroupProps {
  date: string;
  photos: Photo[];
  viewportWidth: number;
  onClick: (photo: Photo) => void;
  onSelect: (photo: Photo) => void;
}

export function PhotoGroup({
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
      targetRowHeight: 250,
      // targetRowHeightTolerance: 0,
      // forceAspectRatio: 1,
      // fullWidthBreakoutRowCadence: 2
    }
  );

  return (
    <div
      style={{ position: "relative", display: "flex", flexDirection: "column" }}
    >
      <h1>{date}</h1>
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
