import { useState } from "react";
// import { Task } from "./types";

type AddTaskProps = {
  addTask: (taskName: string) => void;
};

export default function AddTask({
  addTask,
}: AddTaskProps) {
  const [taskName, setTaskName] = useState("");


  // useEffect(() => {
  //   if (editingTask) {
  //     setTaskName(editingTask.title);
  //   }
  // }, [editingTask]);

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTaskName = taskName.trim();
    if (!trimmedTaskName) {
      return;
    }
   else {
      addTask(trimmedTaskName);
    }

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
        />
        <button>Add</button>
      </form>
    </>
  );
}
