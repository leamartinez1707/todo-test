import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { TaskForm } from "../../types";

type TaskFormProps = {

  register: UseFormRegister<TaskForm>
  errors: FieldErrors<{
    title: string;
    description: string;
    state: string;
  }>
}


export default function TaskForm({ register, errors }: TaskFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="title" className="text-sm uppercase font-bold">
          Nombre de la tarea
        </label>
        <input
          id="title"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre de la tarea"
          {...register("title", {
            required: "El título de la tarea es obligatorio",
          })}
        />

        {errors.title && (
          <ErrorMessage>{errors.title.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="description" className="text-sm uppercase font-bold">
          Descripción de tarea
        </label>
        <input
          id="description"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Descripción de la tarea"
          {...register("description", {
            required: "La descripión es obligatoria",
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="state" className="text-sm uppercase font-bold">
          Estado de la tarea
        </label>
        <textarea
          id="state"
          className="w-full p-3  border border-gray-200"
          placeholder="Estado de la tarea"
          {...register("state", {
            required: "Estado de tarea es obligatorio"
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  )
}
