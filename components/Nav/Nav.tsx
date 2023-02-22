import clsx from "clsx";
import styles from "./Nav.module.css";
export default function Nav() {
  return (
    <nav className={styles.nav}>
      <a className={clsx(styles.link, styles.primary)} href={"/"}>
        Hamza
      </a>
      <a className={styles.link} href={"/#about"}>
        About
      </a>
      <a className={styles.link} href={"/#projects"}>
        Projects
      </a>
    </nav>
  );
}
