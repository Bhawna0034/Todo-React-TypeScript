import { useState } from "react";
import { Task } from "./types";
import AddTask from "./AddTask";

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
      <AddTask
        addTask={addTask}
      />
      
      <ul>
        {tasks.map((task) => {
          return <li key={task.id}>{task.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
