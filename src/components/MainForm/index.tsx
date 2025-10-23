import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import styles from "./styles.module.css";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import { showMessage } from "../../adapters/showMessage";

export function MainForm() {
  const { state, dispatch } = useTaskContext();

  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || "";

  //ciclos

  const nextCycle = getNextCycle(state.currentCycle); // pega o proximo ciclo baseado no estado atual antes de submeter o formualrio.
  const nextTypeCycle = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) {
      console.warn("Input ref is null");
      return;
    }

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn("Digite o nome da tarefa");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptedDate: null,
      durationInMinutes: state.config[nextTypeCycle],
      type: nextTypeCycle,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    showMessage.success("Tarefa iniciada");
  }

  function handleInterruptTask() {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });

    showMessage.dismiss();
    showMessage.error("Tarefa interrompida");
  }
  return (
    <form onSubmit={handleCreateNewTask} className={styles.form} action="">
      <div className={styles.formRow}>
        <DefaultInput
          labelText="Ciclo atual"
          id="meuInput"
          type="text"
          placeholder="Meu input"
          // value={taskName} //input controlado pelo estado taskName que é monitorado pelo useState
          // onChange={(e) => setTaskName(e.target.value)}
          defaultValue={lastTaskName}
          ref={taskNameInput}
          disabled={state.activeTask !== null}
        />
      </div>

      <div className={styles.formRow}>
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}
      <div className={styles.formRow}>
        {!state.activeTask && (
          <DefaultButton
            icon={
              <>
                <PlayCircleIcon />
              </>
            }
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
            color="green"
            type="submit"
            key="botao_submit"
          />
        )}

        {state.activeTask && (
          <DefaultButton
            icon={
              <>
                <StopCircleIcon />
              </>
            }
            aria-label="Interroper ciclo ativo"
            title="Interroper ciclo ativo"
            color="red"
            type="button"
            key="botao_button"
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}
