import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { RouterLink } from "../RouterLink";

type AvaliableThemes = "dark" | "light";
export function Menu() {
  const [theme, setTheme] = useState<AvaliableThemes>(() => {
    const savedTheme = localStorage.getItem("theme") as AvaliableThemes;
    return savedTheme || "dark";
  });

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    event.preventDefault();

    setTheme((prevTheme) => {
      // tenho acesso ao estado anterior
      const nextTheme = prevTheme === "dark" ? "light" : "dark";
      return nextTheme;
    });
  }

  // useEffect(() => {

  //   console.log('useEffect sem dependências', Date.now());

  // }); // Executado todas vez que o componente renderiza na tela

  // useEffect(() => {

  //   console.log('useEffect com array deps vazio', Date.now());

  // }, []); // Executa apenas quando o React monta o componente na tela pela primeira vez
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    //Função de limpeza, logia a ser implementada conforme a necessidade.
    //  Ela é executada antes do próximo useEffect ser disparado
    return () => {};
  }, [theme]); // Executa sempre que a variável de estado theme for alterada

  return (
    <nav className={styles.menu}>
      <RouterLink
        href="/"
        className={styles.menuLink}
        aria-label="Ir para a Home"
        title="Ir para a Home"
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        href="/history"
        className={styles.menuLink}
        aria-label="Ver histórico"
        title="Ver histórico"
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        href="/settings"
        className={styles.menuLink}
        aria-label="Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </RouterLink>
      <a
        className={styles.menuLink}
        onClick={handleThemeChange}
        aria-label="Mudar tema"
        title="Mudar tema"
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </a>
    </nav>
  );
}
