"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

import justifiedLayout from "justified-layout";

export default function Home() {
  const [photos, setPhotos] = useState<any[]>([]);

  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    fetch("/api/v1/photos")
      .then((res) => res.json())
      .then(setPhotos);

    const handleResize = () => setViewportWidth(window.innerWidth);

    // 初始获取视口宽度
    handleResize();

    // 监听窗口大小变化
    window.addEventListener("resize", handleResize);

    // 清理事件监听器
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!photos.length) {
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
    <main className={styles.main}>
      {layout.boxes.map(({ width, height, top, left }, index) => (
        <Image
          key={index}
          src={`/api/v1/photos/${photos[index].id}/thumbnail?variant=2`}
          width={width}
          height={height}
          style={{ top, left, position: "absolute" }}
          alt=""
        />
      ))}
    </main>
  );
}
