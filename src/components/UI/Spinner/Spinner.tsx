import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100%-80px)]">
      <div className={styles.skChase}>
        <div className={styles.skChaseDot}></div>
        <div className={styles.skChaseDot}></div>
        <div className={styles.skChaseDot}></div>
        <div className={styles.skChaseDot}></div>
        <div className={styles.skChaseDot}></div>
        <div className={styles.skChaseDot}></div>
      </div>
    </div>
  );
};

export default Spinner;
