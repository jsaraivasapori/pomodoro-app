import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import styles from "./styles.module.css";

export function CountDown() {
  const taskContext = useTaskContext();

  return (
    <div className={styles.countdown}>
      {taskContext.state.formattedSecondsRemaining}
    </div>
  );
}
