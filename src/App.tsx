import { useState } from "react";

type Priority = "p1" | "p2" | "p3";
type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const inputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter'){
      addTask();
    }
  }
  const addTask = () => {
    const trimmedTaskName = taskName.trim();
    if (!trimmedTaskName) {
      return;
    }
    console.info(taskName);
    setTasks([
      ...tasks,
      {
        id: new Date().getTime(),
        title: taskName,
        isCompleted: false,
      },
    ]);
    setTaskName("");
  };

  return (
    <div>
      <h1>Tasks</h1>
      <label htmlFor="input-task">Add Task:</label>
      <input
        id="input-task"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        onKeyDown={inputKeyDown}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => {
          return <li key={task.id}>{task.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
