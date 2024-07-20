import { createPortal } from "react-dom";
import styles from "./photo-viewer.module.css";

export default function PhotoViewer() {
  return (
    <>
      <div className={styles.viewer}>
        This child is placed in the document body.
      </div>
    </>
  );
}
