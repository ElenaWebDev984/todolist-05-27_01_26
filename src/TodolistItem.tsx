import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"
import { Button } from "./Button"
import { Task } from "./Task"
import { getTasksForRender } from "./utils"

type Props = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType["id"]) => void
    createTask: (title: TaskType["title"]) => void
    changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType["isDone"]) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({
    title,
    tasks,
    deleteTask,
    createTask,
    changeTaskStatus
}: Props) => {

    const [taskTitle, setTaskTitle] = useState("")
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const [error, setError] = useState(false)

    const tasksForRender = getTasksForRender(tasks, filter)

    const changeTodolistFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const createTaskOnClickHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            createTask(taskTitle)
        } else {
            setError(true)
        }

        setTaskTitle("")
    }
    const createTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && createTaskOnClickHandler()
    const setTaskTitleOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }

    const changeFilterAllOnClickHandler = () => changeTodolistFilter("all")
    const changeFilterActiveOnClickHandler = () => changeTodolistFilter("active")
    const changeFilterCompletedOnClickHandler = () => changeTodolistFilter("completed")

    const minTaskTitleLength = 3
    const maxTaskTitleLength = 10

    const isMinTaskTitleNotValid = taskTitle.length < minTaskTitleLength
    const isMaxTaskTitleNotValid = taskTitle.length > maxTaskTitleLength
    const isTaskTitleValid = !isMinTaskTitleNotValid && !isMaxTaskTitleNotValid

    let userMessage: React.ReactNode | null = null
    if (!!taskTitle.length && isMinTaskTitleNotValid) {
        userMessage = <div>Title must be more then {minTaskTitleLength} charters</div>
    }
    if (isTaskTitleValid) {
        userMessage = <div>Max title length is {maxTaskTitleLength} charters</div>
    }
    if (isMaxTaskTitleNotValid) {
        userMessage = <div style={{ color: "red" }}>Max title length is {maxTaskTitleLength} charters</div>
    }
    if (error) {
        userMessage = <div style={{ color: "red" }}>Enter valid value</div>
    }


    const tasksList = tasksForRender.length === 0
        ? <span>Your tasks list is empty</span>
        : <ul>
            {tasksForRender.map((t: TaskType) => {
                const changeTaskStatusHandler = (isDone: TaskType["isDone"]) => {
                    changeTaskStatus(t.id, isDone)
                }
                const deleteTaskHandler = () => deleteTask(t.id)
                const taskClassNames = t.isDone ? "task-done" : "task"
                return (
                    <Task
                        key={t.id}
                        title={t.title}
                        isDone={t.isDone}
                        className={taskClassNames}
                        deleteTask={deleteTaskHandler}
                        changeTaskStatusHandler={changeTaskStatusHandler}
                    />)
            })}
        </ul>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    placeholder={"Title must be more then 3 charters"}
                    value={taskTitle}
                    onChange={setTaskTitleOnChangeHandler}
                    onKeyDown={createTaskOnKeyDownHandler}
                    className={error ? "task-input-error" : ""}
                />
                <Button
                    disabled={isMinTaskTitleNotValid || isMaxTaskTitleNotValid}
                    title="+"
                    onClick={createTaskOnClickHandler}
                />
                {userMessage}
            </div>
            {tasksList}
            <div>
                <Button
                    title="All"
                    className={filter === "all" ? "btn-filter-active" : ""}
                    onClick={changeFilterAllOnClickHandler}
                />
                <Button
                    title="Active"
                    className={filter === "active" ? "btn-filter-active" : ""}
                    onClick={changeFilterActiveOnClickHandler}
                />
                <Button
                    title="Completed"
                    className={filter === "completed" ? "btn-filter-active" : ""}
                    onClick={changeFilterCompletedOnClickHandler}
                />
            </div>
        </div>
    )
}