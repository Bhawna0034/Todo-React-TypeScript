import { useState } from "react";
import { Task } from "./types";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import TaskListItem from "./TaskListItem";
import TaskListHeader from "./TaskListHeader";

const todoKey = "reactTodo";
function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try{
      const storedTasks = localStorage.getItem(todoKey);
    if(!storedTasks || storedTasks === undefined) return [];
    return JSON.parse(storedTasks) as Task[];
    }catch(error){
      console.info("failed to get data from local storage: ", error);
      return [];
    }
    
  });
 
  // const [editingTask, setEditingTask] = useState<Task | null>(null);

  console.log(tasks);

  localStorage.setItem(todoKey, JSON.stringify(tasks));

  // Add a New Task
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

  // Delete a Task
  const deleteTask = (taskId: number) => {
    // console.info("Delete Task: ", taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Edit a Task
  const updateTask = (newTask: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === newTask.id ? { ...task, title: newTask.title } : task
      )
    );
  };

  return (
    <div>
      <h1>Tasks</h1>
      <AddTask
        addTask={addTask}
      />

      <TaskList>
        <TaskListHeader count={tasks.length} />
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}
            onDelete={deleteTask}
            onEdit={updateTask}
            task={task}
          />
        ))}
      </TaskList>
    </div>
  );
}

export default App;
