import { useState } from "react";
import { Task } from "./types";

type TaskListItemProps = {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
};

export default function TaskListItem({
  task,
  onDelete,
  onEdit,
}: TaskListItemProps) {
  // console.info("TaskListItem Rendered");
  const [localTask, setLocalTask] = useState(task);
  const [isEditing, setIsEditing] = useState(false);

  const handleIsEditing = () => {
    if(isEditing){
      onEdit(localTask);
    }
    setIsEditing(!isEditing);
  }

  return (
    <>
      <li>
        <input 
          value={localTask.title}
          disabled={!isEditing}
          onChange={(event) =>
            setLocalTask({
              ...localTask,
              title: event.target.value,
            })
          }
        />
        <button onClick={() => onDelete(task.id)}>Delete</button>
        <button onClick={handleIsEditing}>{isEditing? "Save" : "Edit"}</button>
      </li>
    </>
  );
}
