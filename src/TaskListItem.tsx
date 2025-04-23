import { Task } from "./types";

type TaskListItemProps = {
    task: Task;
    onDelete: (id: number) => void;
    children: React.ReactNode;
};

export default function TaskListItem({task, onDelete, children }: TaskListItemProps) {
  // console.info("TaskListItem Rendered");

  return (
    <>
     
      <li>{children}
      <button onClick={() => onDelete(task.id)}>Delete</button>
      </li>
    
      
      
    </>
  );
}
