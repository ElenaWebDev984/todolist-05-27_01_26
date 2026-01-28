import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType, TodolistType } from "./App"
import { Button } from "./Button"
import { Task } from "./Task"
import { getTasksForRender } from "./utils"

type Props = {
    id: TodolistType["id"]
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    deleteTask: (taskId: TaskType["id"], todolistId: TodolistType["id"]) => void
    createTask: (title: TaskType["title"], todolistId: TodolistType["id"]) => void
    deleteTodolist: (todolistId: TodolistType["id"]) => void
    changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => void
    changeTodolistFilter: (filter: FilterValuesType, todolistId: TodolistType["id"]) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({
    id,
    title,
    tasks,
    filter,
    deleteTask,
    createTask,
    deleteTodolist,
    changeTaskStatus,
    changeTodolistFilter
}: Props) => {

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState(false)

    const createTaskOnClickHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            createTask(taskTitle, id)
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
    const changeFilterAllOnClickHandler = () => changeTodolistFilter("all", id)
    const changeFilterActiveOnClickHandler = () => changeTodolistFilter("active", id)
    const changeFilterCompletedOnClickHandler = () => changeTodolistFilter("completed", id)
    const deleteTodolistHandler = () => deleteTodolist(id)

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


    const tasksList = tasks.length === 0
        ? <span>Your tasks list is empty</span>
        : <ul>
            {tasks.map((t: TaskType) => {
                const changeTaskStatusHandler = (isDone: TaskType["isDone"]) => {
                    changeTaskStatus(t.id, isDone, id)
                }
                const deleteTaskHandler = () => deleteTask(t.id, id)
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
            <h3>
                {title}
                <Button title="x" onClick={deleteTodolistHandler} />
            </h3>
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