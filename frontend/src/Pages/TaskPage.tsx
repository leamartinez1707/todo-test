import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import TaskForm from "../Components/Task/TaskForm"

export const TaskPage = () => {


  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      state: 'Pendiente'
    }
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
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