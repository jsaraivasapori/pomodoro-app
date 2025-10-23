import styles from "./styles.module.css";

type HeadingProps = {
    children: React.ReactNode;
};

//Estou desestruturando o children das props
export function Heading({ children }: HeadingProps) {
    return <h1 className={styles.heading}>{children}</h1>;
}
