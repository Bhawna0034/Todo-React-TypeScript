import { useState } from "react";
import { Task } from "./types";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import TaskListItem from "./TaskListItem";
import TaskListHeader from "./TaskListHeader";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskName: string) => {
    // console.info(taskName);
    setTasks([
      ...tasks,
      {
        id: new Date().getTime(),
        title: taskName,
        isCompleted: false,
      },
    ]);
  };
  
  const deleteTask = (taskId: number)=> {
    // console.info("Delete Task: ", taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  return (
    <div>
      <h1>Tasks</h1>
      <AddTask addTask={addTask} />

      <TaskList>
        <TaskListHeader count={tasks.length} />
        {tasks.map((task) => (
          <TaskListItem key={task.id} onDelete={deleteTask} task={task}>{task.title}</TaskListItem>
        ))}
      </TaskList>
    </div>
  );
}

export default App;
