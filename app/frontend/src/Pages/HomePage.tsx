import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getTasks } from "../api/tasks"
import { Task } from "../types/types"
import { Options } from "../Components/Task/Options"

export const HomePage = () => {

  const [tasks, setTasks] = useState<Task[]>([])
  const [dropdown, setDropdown] = useState(false)
  const [taskUpdated, setTaskUpdated] = useState(false)


  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks()
      setTasks(data)
    }
    fetchTasks()
  }, [taskUpdated])

  return (
    <div>
      <h1 className="text-5xl font-black">Mis tareas</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Manejar y administrar las tareas</p>
      <nav className="my-4">
        <Link to="/task/create" className="bg-red-300 hover:bg-red-500 px-10 py-2 rounded-sm text-white text-xl font-bold cursor-pointer transition-colors">Nueva tarea</Link>
      </nav>

      {tasks.length < 1 ? <p className="text-2xl font-light text-gray-500 mt-5">No hay tareas</p> :
        <ul className="shadow-lg border-lg bg-transparent">
          {tasks
            .filter((task) => task.state === 'pendiente')
            .map((task: Task) => (
              <li key={task.id} className="my-2 hover:cursor-pointer">
                <div className="w-full rounded-md p-2 bg-gray-100">
                  <div className="flex justify-between">
                    <div className="flex py-1 h-full items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <h3 className="font-black uppercase mx-2">{task.title} </h3>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-6">
                      <Options
                        task={task}
                        setTaskUpdated={setTaskUpdated}
                      />
                    </div>
                  </div>

                  <p className='text-wrap text-md font-medium text-left'>{task.description}</p>
                  <p className="text-sm">Vence el día {new Date(task.expirateDate).getDate()} a las {new Date(task.expirateDate).toLocaleTimeString()}</p>
                </div>
              </li>
            ))
          }
        </ul>
      }
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
      {dropdown === true ?
        <ul className="shadow-lg border-lg bg-transparent">
          {
            tasks
              .filter((task) => task.state === 'completada')
              .map((task: Task) => (
                <li key={task.id} className="my-2 hover:cursor-pointer">
                  <div className="w-full rounded-md p-2 bg-gray-100">
                    <div className="flex justify-between">
                      <div className="flex py-1 h-full items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                        <h3 className="font-black uppercase mx-2">{task.title} </h3>
                      </div>
                      <div className="flex shrink-0 items-center gap-x-6">
                        <Options
                          task={task}
                          setTaskUpdated={setTaskUpdated}
                        />
                      </div>
                    </div>

                    <p className='text-wrap text-md font-medium text-left'>{task.description}</p>
                    <p className="text-sm">Vence el día {new Date(task.expirateDate).getDate()} a las {new Date(task.expirateDate).toLocaleTimeString()}</p>
                  </div>
                </li>
              ))
          }
        </ul>
        : null
      }
    </div >
  )
}
