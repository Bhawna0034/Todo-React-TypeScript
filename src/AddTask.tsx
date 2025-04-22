import { useState } from "react";

type AddTaskProps = {
  addTask: (taskName: string) => void;
};

export default function AddTask({ addTask }: AddTaskProps) {
  const [taskName, setTaskName] = useState("");
  const inputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // handleAddTask();
    }
  };

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTaskName = taskName.trim();
    if (!trimmedTaskName) {
      return;
    }
    addTask(trimmedTaskName);
    setTaskName("");
  };
  return (
    <>
    <form onSubmit={handleAddTask}>
      <label htmlFor="input-task">Add Task:</label>
      <input
        id="input-task"
        required
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        onKeyDown={inputKeyDown}
      />
      <button>Add</button>
      </form>
    </>
  );
}
