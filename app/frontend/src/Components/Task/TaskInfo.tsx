import { Task } from "../../types/types"
import { Options } from "./Options"


type TaskProps = {
  task: Task
}

export const TaskInfo = ({ task }: TaskProps) => {

  return (
    <li key={task.id} className="my-2 hover:cursor-pointer">
      <div className="w-full rounded-md p-2 bg-gray-100">
        <div className="flex justify-between">
          <div className="flex py-1 h-full items-center">
            {task.state === 'pendiente' ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            }
            <p className="text-wrap break-words bg-red-200 font-black uppercase ml-2 ">{task.title} </p>
          </div>
          <div className="flex shrink-0 items-center gap-x-6">
            <Options
              task={task}
            />
          </div>
        </div>

        {/* Utilizamos break-word de Tailwind para no salirnos del contenedor si una palabra tiene muchas letras y excede los límites */}
        <p className='text-wrap break-words text-md font-medium text-left'>{task.description}</p>
        <p className="text-sm">Vence el {new Date(task.expirateDate).getDate()}/{new Date(task.expirateDate).getMonth() + 1} a las {new Date(task.expirateDate).toLocaleTimeString()}</p>
      </div>
    </li>
  )
}
