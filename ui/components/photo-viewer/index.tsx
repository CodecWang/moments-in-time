import Image from "next/image";
import styles from "./photo-viewer.module.css";

interface PhotoViewerProps {
  photo: Photo;
  onClose: () => void;
}

export default function PhotoViewer(props: PhotoViewerProps) {
  const { photo, onClose } = props;

  return (
    <>
      <div className={styles.viewer}>
        <button onClick={() => onClose()}>Close</button>
        <Image
          src={`/api/v1/photos/${photo.id}/thumbnail?variant=2`}
          width={photo.thumbnails[0].width}
          height={photo.thumbnails[0].height}
          alt=""
        />
      </div>
    </>
  );
}
