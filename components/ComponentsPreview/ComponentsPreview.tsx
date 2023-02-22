import DatePicker from "./DatePicker";
import Dialog from "./Dialog";
import styles from "./ComponentsPreview.module.css";

export default function ComponentsPreview() {
  return (
    <div className={styles.container}>
      <DatePicker />
      <Dialog />
    </div>
  );
}
