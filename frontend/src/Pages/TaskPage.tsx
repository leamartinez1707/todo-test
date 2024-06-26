import { Link } from "react-router-dom"

export const TaskPage = () => {
  return (
    <div>
      <h1 className="text-5xl font-black">Crear una tarea</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Completar el siguiente formulario</p>

      <nav className="my-4">
        <Link to="/tasks" className="bg-red-300 hover:bg-red-500 px-10 py-2 rounded-sm text-white text-xl font-bold cursor-pointer transition-colors">Volver a las tareas</Link>
      </nav>
    </div>
  )
}