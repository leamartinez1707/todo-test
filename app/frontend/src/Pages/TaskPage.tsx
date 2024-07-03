import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useParams, useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import TaskForm from "../Components/Task/TaskForm"
import { useTasks } from "../hooks/useTasks"
import type { TaskFormData } from "../types/types"

export const TaskPage = () => {

  const initialValues: TaskFormData = {
    title: "",
    description: "",
    state: "pendiente"
  }
  const { register, reset, handleSubmit, formState: { errors }, setValue } = useForm({ defaultValues: initialValues })
  const { createTask, getTaskById, updateTask, deleteTask } = useTasks()
  const params = useParams()
  const navigate = useNavigate()

  // Luego pasarle esta funcion al componente para que se ejecute cuando se haga submit
  const onSubmit = handleSubmit(async (data: TaskFormData) => {
    try {
      if (params.id) {
        const updatedTask = await updateTask(+params.id, data)
        if (!updatedTask) return toast.error('Error al modificar la tarea')
        toast.success('Tarea modificada con exito')
        navigate('/tasks')

      }
      else {
        const newTask = await createTask(data)
        if (!newTask) return toast.error('Error al crear la tarea')
        toast.success('Tarea creada con exito')
        reset()
      }

    } catch (error) {
      if (params.id) return toast.error('Error al modificar la tarea')
      toast.error('Error al crear la tarea')
    }
  })
  const deleteTaskById = async () => {
    if (params.id) {
      const deleted = deleteTask(+params.id)
      if (!deleted) return toast.error('Error al eliminar la tarea')
    } else {
      return toast.error('Error al eliminar la tarea')
    }
    reset()
    toast.success(`Tarea ${params.id} eliminada con exito`)
    navigate('/task/create')
  }

  useEffect(() => {

    const loadTask = async () => {
      if (params.id) {
        const task = await getTaskById(+params.id)
        if (!task) {
          toast.warning('Tarea no encontrada')
          setTimeout(() => navigate('/task/create'), 1000)
        }
        setValue('title', task.title)
        setValue('description', task.description)
        setValue('state', task.state)
      }
      if (!params.id) reset()
    }
    loadTask()

  }, [params.id])


  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">{params.id ? 'Modificar tarea' : 'Crear tarea'}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Llenar el siguiente formulario o volver a tareas</p>
        <div className="flex flex-col sm:flex-row gap-x-5">
          <nav className="my-4">
            <Link to="/tasks" className="bg-blue-300 hover:bg-blue-500 px-2 sm:px-10 py-2 rounded-sm text-white text-xl font-bold cursor-pointer transition-colors">Volver a las tareas</Link>
          </nav>
          {/* Si es una tarea a modificar, mostrar el boton de eliminar */}
          {params.id ?
            <div className="flex flex-col sm:flex-row gap-x-5">
              <nav className="my-4">
                <Link to="/task/create" className="bg-green-300 hover:bg-green-500 px-2 sm:px-10 py-2 rounded-sm text-white text-xl font-bold cursor-pointer transition-colors">Nueva tarea</Link>
              </nav>
              <button
                onClick={deleteTaskById}
                className="bg-red-400 hover:bg-red-600 p-2 sm:p-1 max-w-24 sm:max-w-36 rounded-sm sm:rounded-sm text-white text-sm font-bold cursor-pointer transition-colors">
                Eliminar</button>
            </div>
            : null

          }
        </div>

        <form onSubmit={onSubmit} className="mt-8 shadow-md p-8 rounded-md bg-white"
          noValidate
        >

          <TaskForm register={register} errors={errors} />

          <input type="submit"
            className="bg-gray-500 hover:bg-gray-700 w-full p-2 rounded-sm text-white uppercase font-bold cursor-pointer transition-colors"
            value={params.id ? "Modificar" : "Crear tarea"}
          />
        </form>

      </div>
    </>
  )
}