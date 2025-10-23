import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { useEffect } from "react";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function History() {
  const { state, dispatch } = useTaskContext();

  useEffect(() => {
    document.title = "Histórico - Pomodoro App";
  }, []);

  const hasTasks = state.tasks.length > 0;

  const taskTypeMap = {
    workTime: "Trabalho",
    shortBreakTime: "Pausa Curta",
    longBreakTime: "Pausa Longa",
  };

  let sortedTasks = [...state.tasks].sort((a, b) => {
    return b.startDate - a.startDate;
  });

  useEffect(() => {
    sortedTasks = [...state.tasks].sort((a, b) => {
      return b.startDate - a.startDate;
    });
  }, [state.tasks]);

  function handleResetistory() {
    if (!confirm("Tem certeza")) return;
    dispatch({ type: TaskActionTypes.RESET_STATE });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color="red"
                aria-label="Apagar todo o histórico"
                title="Apagar histórico"
                onClick={handleResetistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th>Tarefa</th>

                  <th>Duração</th>

                  <th>Data</th>

                  <th>Status</th>

                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortedTasks.map((task) => {
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>

                      <td>{task.durationInMinutes}min</td>

                      <td>{formatDate(task.startDate)}</td>

                      <td>{getTaskStatus(task, state.activeTask)}</td>

                      <td>{taskTypeMap[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            Ainda não existem tarefas criadas.
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}
