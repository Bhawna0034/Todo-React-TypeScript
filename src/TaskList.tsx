import { useEffect, useState } from "react";

type TaskListProps = {
  header?: React.ReactNode;
};


export default function TaskList({header, children}: React.PropsWithChildren<TaskListProps>) {
  // console.info('TaskList rendered');
  const [secondsPassed, setSecondsPassed] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsPassed((secondsPassed) => secondsPassed + 1);
    }, 1000);

    return () => clearInterval(interval);
  },[]);
  return (
    <>
    {header}
    <p>Seconds passed: {secondsPassed}</p>
    <ul>{children}</ul>
    </>
    
  );
}
