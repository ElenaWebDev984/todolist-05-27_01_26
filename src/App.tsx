
import { useState } from 'react'
import './App.css'
import { TaskType, TodolistItem } from './TodolistItem'
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todolistId: string]: TaskType[]
}



function App() {

  // BLL
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
            {id: todolistId_1, title: 'What to learn', filter: 'all'},
            {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            { id: v1(), title: "HTML & CSS", isDone: true },
            { id: v1(), title: "JS & TS", isDone: true },
            { id: v1(), title: "REACT", isDone: false },
        ],
        [todolistId_2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Fruit", isDone: true },
            { id: v1(), title: "Bread", isDone: false },
        ],
    })



  // CRUD
  const deleteTask = (taskId: TaskType["id"], todolistId: TodolistType['id']) => {
    // 1. Создаём новую структуру данных
    const nextState = {...tasks, [todolistId] : tasks[todolistId].filter(t => t.id !== taskId) }
    // 2. Передаём новую структуру данных для обновления представления (визуализации) данных
    setTasks(nextState)
  }
  const createTask = (title: TaskType["title"], todolistId: TodolistType['id']) => {
    // 1. Создаём новую структуру данных
    const newTask: TaskType = { id: v1(), title, isDone: false }
    const nextState = {...tasks, [todolistId]: [...tasks[todolistId], newTask]}
    // 2. Передаём новую структуру данных для обновления представления (визуализации) данных
    setTasks(nextState)
  }
  const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType['id']) => {
    // 1. Создаём новую структуру данных
    const nextState: TaskType[] = tasks.map(t => t.id === taskId ? {...t, isDone}   : t)
    // 2. Передаём новую структуру данных для обновления представления (визуализации) данных
    setTasks(nextState)
  }
  const changeTaskTitle = () => {}

  // UI


  return (
    <div className="app">
      <TodolistItem
        title={todoListTitle}
        tasks={tasks}
        deleteTask={deleteTask}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  )
}

export default App
