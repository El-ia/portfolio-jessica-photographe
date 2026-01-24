import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Footer">
      <p className={styles.text}>
        © {year} Jessica Rozycka. Tous droits réservés.
      </p>
    </footer>
  );
}