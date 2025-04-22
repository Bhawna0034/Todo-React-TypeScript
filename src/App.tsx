import { useState } from "react";
import { Task } from "./types";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskName: string) => {
    console.info(taskName);
    setTasks([
      ...tasks,
      {
        id: new Date().getTime(),
        title: taskName,
        isCompleted: false,
      },
    ]);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <AddTask addTask={addTask} />

      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
