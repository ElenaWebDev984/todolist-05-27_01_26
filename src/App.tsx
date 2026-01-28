
import { useState } from 'react'
import './App.css'
import { TaskType, TodolistItem } from './TodolistItem'
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed"



function App() {
  console.log(v1());

  // BLL
  const todoListTitle = "What to learn"

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML & CSS", isDone: true },
    { id: v1(), title: "JS & TS", isDone: true },
    { id: v1(), title: "REACT", isDone: false },
  ])

  // CRUD
  const deleteTask = (taskId: TaskType["id"]) => {
    // 1. Создаём новую сткутуру данных 
    const nextState = tasks.filter(t => t.id !== taskId)
    // 2. Передаём новую сткутуру данных для обновления представления (визуализации) данных
    setTasks(nextState)
  }
  const createTask = (title: TaskType["title"]) => {
    // 1. Создаём новую сткутуру данных 
    // const newTask: TaskType = { id: v1(), title, isDone: false }
    const nextState: TaskType[] = [...tasks, { id: v1(), title, isDone: false }]
    // 2. Передаём новую сткутуру данных для обновления представления (визуализации) данных
    setTasks(nextState)
  }
  const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"]) => {
    // 1. Создаём новую сткутуру данных 
    const nextState: TaskType[] = tasks.map(t => t.id === taskId ? {...t, isDone}   : t)
    // 2. Передаём новую сткутуру данных для обновления представления (визуализации) данных
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
