import { useEffect, useState } from "react";
import { Task } from "./types";

type AddTaskProps = {
  addTask: (taskName: string) => void;
  editingTask: Task | null;
  updateTask: (taskId: number, newTitle: string) => void;
};

export default function AddTask({
  addTask,
  editingTask,
  updateTask,
}: AddTaskProps) {
  const [taskName, setTaskName] = useState("");
  const inputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // handleAddTask();
    }
  };

  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.title);
    }
  }, [editingTask]);

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTaskName = taskName.trim();
    if (!trimmedTaskName) {
      return;
    }
    if (editingTask) {
      updateTask(editingTask.id, trimmedTaskName);
    } else {
      addTask(trimmedTaskName);
    }

    setTaskName("");
  };
  return (
    <>
      <form onSubmit={handleAddTask}>
        <label htmlFor="input-task">{editingTask ? "Edit Task:": "Add Task:"}</label>
        <input
          id="input-task"
          required
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          onKeyDown={inputKeyDown}
        />
        <button>{editingTask ? "Save" : 
        "Add"}</button>
      </form>
    </>
  );
}
