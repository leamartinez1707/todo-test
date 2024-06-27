import { Link } from "react-router-dom"
import { verifyTokenRequest } from "../api/auth"

export const HomePage = () => {
  return (
    <div>
      <h1 className="text-5xl font-black">Mis tareas</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Manejar y administrar las tareas</p>
      <button
        onClick={verifyTokenRequest}
        className="text-black border bg-red-900">Click me</button>
      <nav className="my-4">
        <Link to="/task/create" className="bg-red-300 hover:bg-red-500 px-10 py-2 rounded-sm text-white text-xl font-bold cursor-pointer transition-colors">Nueva tarea</Link>
      </nav>
    </div>
  )
}
