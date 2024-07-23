import Link from "next/link";
import styles from "./nav-bar.module.css";

export default function Header() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/photos">照片</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/albums">相册</Link>
        </li>
        <button className={styles.navItem}>AI</button>
        <li className={styles.navItem}>
          <Link href="/explorer">探索</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/demo">我的</Link>
        </li>
        {/* <li className={styles.navItem}>
          <Link href="/share">分享</Link>
        </li> */}
      </ul>
    </nav>
  );
}
