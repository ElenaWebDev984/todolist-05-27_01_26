import { FilterValuesType } from "./App"
import { TaskType } from "./TodolistItem"

export const getTasksForRender = (tasks: TaskType[], filter: FilterValuesType)=> {
        return  filter === "active"
            ? tasks.filter(t => t.isDone === false)
            : filter === "completed"
                ? tasks.filter(t => t.isDone === true)
                : tasks
    }
