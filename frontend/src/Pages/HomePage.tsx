import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getTasks } from "../api/tasks"
import { Task } from "../types/types"

export const HomePage = () => {

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks()
      setTasks(data)
    }
    fetchTasks()
  }, [])

  return (
    <div>
      <h1 className="text-5xl font-black">Mis tareas</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Manejar y administrar las tareas</p>
      <nav className="my-4">
        <Link to="/task/create" className="bg-red-300 hover:bg-red-500 px-10 py-2 rounded-sm text-white text-xl font-bold cursor-pointer transition-colors">Nueva tarea</Link>
      </nav>

      <h2 className="text-3xl font-black py-4">Tareas</h2>
      {tasks.length < 1 ? <p className="text-2xl font-light text-gray-500 mt-5">No hay tareas</p> :
        <ul className="shadow-lg border-lg">
          {tasks.map((task: Task) => (
            <li key={task.id} className="my-2">
              <div className="p-2 sm:w-1/2 w-full bg-gray-100">
                <div className=" rounded flex p-4 h-full items-center">
                  {task.state === 'pendiente' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                  }

                  <span>task id {task.id}

                  </span>
                  <span className="font-black mr-2">{task.title} </span>
                  <span className="font-medium">{task.description}</span>
                  <span>{task.userId}</span>
                  <p className="font-bold text-lg">User id: {task.userId}</p>
                  <p className="font-bold text-lg">Estado: {task.state}</p>

                </div>
              </div>
            </li>
          ))
          }

        </ul>
      }
    </div>
  )
}
