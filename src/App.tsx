
import { useState } from 'react'
import './App.css'
import { TaskType, TodolistItem } from './TodolistItem'
import { v1 } from 'uuid';
import { getTasksForRender } from './utils';

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [todolistId: TodolistType["id"]]: TaskType[]
}

function App() {
  // BLL
  const todolistId_1 = v1()
  const todolistId_2 = v1()
  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId_1, title: "What to learn", filter: "all" },
    { id: todolistId_2, title: "What to buy", filter: "all" },
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId_1]: [
      { id: v1(), title: "HTML & CSS", isDone: true },
      { id: v1(), title: "JS & TS", isDone: true },
      { id: v1(), title: "REACT", isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Water", isDone: true },
      { id: v1(), title: "Bread", isDone: false },
    ]
  })


  // CRUD tasks
  const deleteTask = (taskId: TaskType["id"], todolistId: TodolistType["id"]) => {
    // 1. Создаём новую сткутуру данных 
    const nextState = { ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) }
    // 2. Передаём новую сткутуру данных для обновления представления (визуализации) данных
    setTasks(nextState)
  }
  const createTask = (title: TaskType["title"], todolistId: TodolistType["id"]) => {
    // 1. Создаём новую сткутуру данных 
    const newTask: TaskType = { id: v1(), title, isDone: false }
    const nextState = { ...tasks, [todolistId]: [...tasks[todolistId], newTask] }
    // 2. Передаём новую сткутуру данных для обновления представления (визуализации) данных
    setTasks(nextState)
  }
  const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => {
    // 1. Создаём новую сткутуру данных 
    const nextState = { ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone } : t) }
    // 2. Передаём новую сткутуру данных для обновления представления (визуализации) данных
    setTasks(nextState)
  }
  const changeTaskTitle = () => { }

  // CRUD todolists
  const changeTodolistFilter = (filter: FilterValuesType, todolistId: TodolistType["id"]) => {
    // 1. Создаём новую сткутуру данных 
    const nextState = todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl)
    // 2. Передаём новую сткутуру данных для обновления представления (визуализации) данных
    setTodolists(nextState)
  }
  const deleteTodolist = (todolistId: TodolistType["id"]) => {
    // 1. Создаём новую сткутуру данных 
    const nextState = todolists.filter(tl => tl.id !== todolistId)
    const copyState = { ...tasks }
    delete copyState[todolistId]
    // 2. Передаём новую сткутуру данных для обновления представления (визуализации) данных
    setTodolists(nextState)
    setTasks(copyState)
  }

  // UI

  const todolistsComponents = todolists.map(tl => {
    const tasksForRender = getTasksForRender(tasks[tl.id], tl.filter)
    return (
      <TodolistItem
        key={tl.id}
        id={tl.id}
        title={tl.title}
        filter={tl.filter}
        tasks={tasksForRender}
        deleteTask={deleteTask}
        createTask={createTask}
        deleteTodolist={deleteTodolist}
        changeTaskStatus={changeTaskStatus}
        changeTodolistFilter={changeTodolistFilter}
      />
    )
  })

  return (
    <div className="app">
      {todolistsComponents}
    </div>
  )
}

export default App
