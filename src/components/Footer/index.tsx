import { RouterLink } from "../RouterLink";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href="/about-pomodoro">
        Entenda como funciona a técnica Pomodoro
      </RouterLink>
      <RouterLink href="/">
        Chronos Podomoro &copy; {new Date().getFullYear()} - Feito com ❤️ por
        João
      </RouterLink>
    </footer>
  );
}
