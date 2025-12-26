import styles from "@/styles/Home.module.css";
import FirstChat from "@/src/components/FirstChat/FirstChat";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Get started.</h1>
        </div>
        <div className={styles.ctas}>
          <FirstChat />
        </div>
      </main>
    </div>
  );
}
