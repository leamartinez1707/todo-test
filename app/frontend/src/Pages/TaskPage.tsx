import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import TaskForm from "../Components/Task/TaskForm"
import type { TaskFormData } from "../types/types"
import { createTask } from "../api/tasks"
import { toast } from "react-toastify"

export const TaskPage = () => {

  const initialValues: TaskFormData = {
    title: "",
    description: "",
    state: "pendiente"
  }
  const { register,reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  // Luego pasarle esta funcion al componente para que se ejecute cuando se haga submit
  const onSubmit = handleSubmit(async (data: TaskFormData) => {
    const newTask = await createTask(data)
    if (!newTask) return toast.error('Error al crear la tarea')
    toast.success('Tarea creada con exito')
    reset()
  })

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear una tarea</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Llenar el siguiente formulario o volver a tareas</p>
        <nav className="my-4">
          <Link to="/tasks" className="bg-red-300 hover:bg-red-500 px-10 py-2 rounded-sm text-white text-xl font-bold cursor-pointer transition-colors">Volver a las tareas</Link>
        </nav>

        <form onSubmit={onSubmit} className="mt-8 shadow-md p-8 rounded-md bg-white"
          noValidate
        >

          <TaskForm register={register} errors={errors} />

          <input type="submit"
            className="bg-gray-500 hover:bg-gray-700 w-full p-2 rounded-sm text-white uppercase font-bold cursor-pointer transition-colors"
            value={"Crear tarea"}
          />
        </form>

      </div>
    </>
  )
}