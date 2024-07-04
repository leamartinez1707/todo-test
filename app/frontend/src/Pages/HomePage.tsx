import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Task } from "../types/types"
import { useTasks } from "../hooks/useTasks"
import { TaskInfo } from "../Components/Task/TaskInfo"

export const HomePage = () => {

  const [dropdown, setDropdown] = useState(false)

  const { tasks, getTasks, taskUpdated } = useTasks()


  useEffect(() => {
    getTasks()
  }, [taskUpdated])

  return (
    <>
      <h1 className="text-5xl font-black">Mis tareas</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Manejar y administrar las tareas</p>
      <nav className="my-4">
        <Link to="/task/create" className="bg-red-300 hover:bg-red-500 px-10 py-2 rounded-sm text-white text-xl font-bold cursor-pointer transition-colors">Nueva tarea</Link>
      </nav>

      {tasks.filter(tsk => tsk.state === 'pendiente').length < 1 && <p className="text-2xl font-light text-gray-500 mt-10">No hay tareas pendientes</p>}

      {/* Si hay tareas agregadas, se listan todas con su correspondiente información */}
      <ul className="shadow-lg border-lg bg-transparent">
        {tasks
          .filter((task) => { return task.state === 'pendiente' })
          .map((task: Task) => (
            <TaskInfo key={task.id} task={task} />
          ))
        }
      </ul>

      <button
        onClick={() => setDropdown(!dropdown)}
        className="flex items-center justify-between bg-blue-400 hover:bg-blue-500 px-10 py-2 rounded-sm text-white text-xl font-bold cursor-pointer duration-500 transition-colors w-full mt-4"
      >
        COMPLETADAS ({tasks.filter(tsk => tsk.state === 'completada').length})

        {dropdown ?
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
          </svg>
          : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>}
      </button>
      {/* Si se activó el botón de dropdown, filtramos y listamos todas las tareas que ya estan completadas. */}
      {dropdown === true ?
        <ul className="shadow-lg border-lg bg-transparent">
          {
            tasks
              .filter((task) => task.state === 'completada')
              .map((task: Task) => (
                <TaskInfo key={task.id} task={task} />
              ))
          }
        </ul>
        : null
      }
    </>
  )
}
