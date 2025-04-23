// type TaskListItemProps = {
//     title: string;
// };

export default function TaskListItem({children}:React.PropsWithChildren){
    // console.info("TaskListItem Rendered");
    return <li>{children}</li>
}