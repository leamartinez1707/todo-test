import { Dispatch, ReactNode, createContext, useEffect, useState } from "react";
import { Task, TaskFormData } from "../types/types";
import { createTaskRequest, deleteTaskRequest, getTaskByIdRequest, getTasksRequest, updateTaskRequest, updateTaskStateRequest } from "../api/tasks";


type TaskContextProps = {
    task: Task
    tasks: Task[]
    getTasks: () => Promise<Task[]>
    getTaskById: (id: Task['id']) => Promise<Task>
    createTask: (task: TaskFormData) => Promise<Task>
    deleteTask: (id: Task['id']) => Promise<Task>
    updateTask: (id: Task['id'], task: TaskFormData) => Promise<Task>
    updateTaskStatus: (id: Task['id']) => Promise<Task>
    taskUpdated: boolean
    setTaskUpdated: Dispatch<React.SetStateAction<boolean>>
}
type TaskProviderProps = {
    children: ReactNode
}

export const TaskContext = createContext<TaskContextProps>(null!);


export const TaskProvider = ({ children }: TaskProviderProps) => {

    const [tasks, setTasks] = useState<Task[]>([])
    const [task, setTask] = useState<Task>(null!)
    const [taskUpdated, setTaskUpdated] = useState(false)

    const getTasks = async () => {
        try {
            const { data } = await getTasksRequest()
            setTasks(data)
        } catch (error: string | any) {
            if (typeof error.response.data.message === 'string') return error.response.data.message
            return error.response.data.message[0]
        }
    }

    const getTaskById = async (id: Task['id']) => {
        try {
            const data = await getTaskByIdRequest(id)
            setTask(data.data)
            return data.data
        } catch (error: string | any) {
            if (typeof error.response.data.message === 'string') return error.response.data.message
            return error.response.data.message[0]
        }
    }

    const createTask = async (task: TaskFormData) => {
        try {
            const { data } = await createTaskRequest(task)
            setTasks([...tasks, data])
            return data
        } catch (error: string | any) {
            if (typeof error.response.data.message === 'string') return error.response.data.message
            return error.response.data.message[0]
        }
    }

    const updateTask = async (id: Task['id'], task: TaskFormData) => {
        try {
            const { data } = await updateTaskRequest(id, task)
            setTasks(tasks.map(t => t.id === id ? data : t))
            return data
        } catch (error: string | any) {
            if (typeof error.response.data.message === 'string') return error.response.data.message
            return error.response.data.message[0]
        }
    }

    const deleteTask = async (id: Task['id']) => {
        try {
            const data = await deleteTaskRequest(id)
            console.log(data)
            setTasks(tasks.filter(t => t.id !== id))
        } catch (error: string | any) {
            if (typeof error.response.data.message === 'string') return error.response.data.message
            return error.response.data.message[0]
        }
    }
    const updateTaskStatus = async (id: Task['id']) => {
        try {
            const { data } = await updateTaskStateRequest(id)
            setTasks(tasks.map(t => t.id === id ? data : t))
            return data
        } catch (error: string | any) {
            if (typeof error.response.data.message === 'string') return error.response.data.message
            return error.response.data.message[0]
        }
    }
    useEffect(() => {
        getTasksRequest()
            .then(res => setTasks(res.data))
    }, [])


    return (
        <TaskContext.Provider value={{
            task,
            tasks,
            getTasks,
            getTaskById,
            createTask,
            deleteTask,
            updateTask,
            updateTaskStatus,
            taskUpdated,
            setTaskUpdated
        }}>

            {children}
        </TaskContext.Provider>
    )
}
