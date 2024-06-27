import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import type { TaskFormData } from "../../types/types";

type TaskFormProps = {

  register: UseFormRegister<TaskFormData>
  errors: FieldErrors<TaskFormData>
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
        <select
          id="state"
          className="w-full p-3  border border-gray-200"
          {...register("state", {
            required: "El estado de la tarea es obligatorio",
          })}
        >
          <option defaultValue={'pendiente'} selected value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>
      </div>
    </>
  )
}
