"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

import { createPortal } from "react-dom";
import PhotoViewer from "@/components/photo-viewer";
import { PhotoGroup } from "@/components/photo-group/page";

enum PhotoLayout {
  Justified,
  Grid,
  Masonry,
}

export default function Home() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState();
  const [photoLayout, setPhotoLayout] = useState<PhotoLayout>(
    PhotoLayout.Justified
  );

  const [photos, setPhotos] = useState<any[]>([]);

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

  if (!photos.length || viewportWidth === 0) {
    return <div>Loading...</div>;
  }

  const handlePhotoClick = (photo: any) => {
    console.log(">>>>", photo);
    setCurrentPhoto(photo);
    setIsViewerOpen(true);
  };

  return (
    <>
      <h1>filter area</h1>
      <div>
        {photos.map(({ date, photos }) => (
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

      {isViewerOpen &&
        createPortal(
          <PhotoViewer
            photo={currentPhoto}
            onClose={() => setIsViewerOpen(false)}
          />,
          document.body
        )}

      {/* 
      
        <div style={{ position: "fixed", height: "50px", bottom: 0 }}>
          <button onClick={() => setPhotoLayout(PhotoLayout.Justified)}>
            Justified
          </button>
          <button onClick={() => setPhotoLayout(PhotoLayout.Grid)}>Grid</button>
          <button onClick={() => setPhotoLayout(PhotoLayout.Masonry)}>
            Masonry
          </button>
        </div> */}
    </>
  );
}
