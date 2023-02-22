import clsx from "clsx";
import styles from "./Dialog.module.css";
export default function Dialog() {
  return (
    <div className={styles.dialog}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <div className={styles.text}>
          <div as="h3" className={styles.title}>
            Are your sure?
          </div>
          <div className="mt-2">
            <p className={styles.paragraph}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              maiores quaerat.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={clsx(styles.button, styles.secondary)}>
          Cancel
        </button>
        <button className={clsx(styles.button, styles.primary)}>Confirm</button>
      </div>
    </div>
  );
}
