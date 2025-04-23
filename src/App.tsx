import { useState } from "react";
import { Task } from "./types";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import TaskListItem from "./TaskListItem";
import TaskListHeader from "./TaskListHeader";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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
  const updateTask = (taskId: number, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
    setEditingTask(null);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <AddTask addTask={addTask} editingTask = {editingTask} updateTask={updateTask}/>

      <TaskList>
        <TaskListHeader count={tasks.length} />
        {tasks.map((task) => (
          <TaskListItem key={task.id} onDelete={deleteTask} onEdit={setEditingTask} task={task}>
            {task.title}
          </TaskListItem>
        ))}
      </TaskList>
    </div>
  );
}

export default App;
