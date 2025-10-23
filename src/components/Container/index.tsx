import styles from "./styles.module.css";
type ContainerPorps = {
    children: React.ReactNode;
};
export function Container({ children }: ContainerPorps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>{children}</div>
        </div>
    );
}
