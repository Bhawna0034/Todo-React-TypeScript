
import { Task } from "./types";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import TaskListItem from "./TaskListItem";
import TaskListHeader from "./TaskListHeader";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("reactTodo", []);
    
 
  // const [editingTask, setEditingTask] = useState<Task | null>(null);

  console.log(tasks);

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
