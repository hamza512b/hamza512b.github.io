import clsx from "clsx";
import Link from "next/link";
import styles from "./Footer.module.css";
export default function Footer(props: { className?: string }) {
  return (
    <footer className={clsx(styles.footer, props.className)}>
      <div>
        <h3>Want to talk</h3>
        <p>
          Feel free to connect if you have questions, looking for a developer or
          just want to talk.
        </p>
        <Link href={"mailto:hamzakhuswan@outlook.com"} className={styles.link}>
          hamzakhuswan@outlook.com
        </Link>
      </div>
      <div className={styles.links}>
        <Link
          href={"https://github.com/hamza512b"}
          referrerPolicy="no-referrer"
          target={"_blank"}
          className={styles.link}
        >
          Github
        </Link>
        ,{" "}
        <Link
          href={"https://www.upwork.com/freelancers/~01924c1277154fbaf9"}
          referrerPolicy="no-referrer"
          target={"_blank"}
          className={styles.link}
        >
          Upwork
        </Link>
      </div>
    </footer>
  );
}
