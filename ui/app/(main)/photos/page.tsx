"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

import justifiedLayout from "justified-layout";
import { createPortal } from "react-dom";
import PhotoViewer from "@/components/photo-viewer";

enum PhotoLayout {
  Justified,
  Grid,
  Masonry,
}

export default function Home() {
  const [photoLayout, setPhotoLayout] = useState<PhotoLayout>(
    PhotoLayout.Justified
  );

  const [photos, setPhotos] = useState<any[]>([]);

  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    fetch("/api/v1/photos")
      .then((res) => res.json())
      .then(setPhotos);

    const handleResize = () => {
      const container = document.getElementsByClassName("page_content__yfoSz");

      if (container.length) {
        const ele = container[0].getBoundingClientRect();
        setViewportWidth(ele.width);
      }
      // setViewportWidth(container?.[0].clientWidth || 200);
      // setViewportWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(">>>", viewportWidth);
  if (!photos.length || viewportWidth === 0) {
    return <div>Loading...</div>;
  }

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
  console.log(">>>", layout);

  return (
    <>
      <div id="photos-container" style={{ position: "relative" }}>
        {layout.boxes.map(({ width, height, top, left }, index) => (
          <Image
            key={index}
            src={`/api/v1/photos/${photos[index].id}/thumbnail?variant=2`}
            width={photoLayout === PhotoLayout.Justified ? width : 200}
            height={photoLayout === PhotoLayout.Justified ? height : 200}
            style={{
              top,
              left,
              position:
                photoLayout === PhotoLayout.Justified ? "absolute" : "unset",
              objectFit:
                photoLayout === PhotoLayout.Justified ? "unset" : "cover",
            }}
            onClick={() => setIsViewerOpen(true)}
            alt=""
          />
        ))}

        {isViewerOpen && createPortal(<PhotoViewer />, document.body)}

        <div style={{ position: "fixed", height: "50px", bottom: 0 }}>
          <button onClick={() => setPhotoLayout(PhotoLayout.Justified)}>
            Justified
          </button>
          <button onClick={() => setPhotoLayout(PhotoLayout.Grid)}>Grid</button>
          <button onClick={() => setPhotoLayout(PhotoLayout.Masonry)}>
            Masonry
          </button>
        </div>
      </div>
    </>
  );
}
