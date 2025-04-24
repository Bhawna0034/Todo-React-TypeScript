import { useEffect, useState } from "react";

export default function useLocalStorage<T>(todoKey: string, initialValue: T){
    const [value, setValue] = useState<T>(() => {
        try{
            const storedTasks = localStorage.getItem(todoKey);
            if(!storedTasks || storedTasks === undefined) return initialValue;
            return JSON.parse(storedTasks);
        }catch(error){
            console.info("Failed to load data from Local Storage: ", error);
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(todoKey, JSON.stringify(value));
    }, [value, todoKey]);
    
    return [value, setValue] as const;

}