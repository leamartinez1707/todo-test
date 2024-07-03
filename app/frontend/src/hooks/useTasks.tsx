import { useContext } from "react"
import { TaskContext } from "../Context/TaskContext"


export const useTasks = () => {

    const context = useContext(TaskContext)
    if (!context) throw new Error('useTasks debe ser englobado con un TasksProvider')
    return context
}