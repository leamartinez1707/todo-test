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
        {errors.title && (
          <ErrorMessage>{errors.title.message}</ErrorMessage>
        )}
        <input
          id="title"
          className="w-full p-2 border border-gray-200"
          type="text"
          placeholder="Máx. 50 carácteres"
          {...register("title", {
            maxLength: {
              value: 30,
              message: "El título de la tarea no puede tener más de 50 caracteres",
            },
            required: "El título de la tarea es obligatorio",
          })}
        />

      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="description" className="text-sm uppercase font-bold">
          Descripción de tarea
        </label>
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
        <input
          id="description"
          className="w-full p-2  border border-gray-200"
          type="text"
          placeholder="Ej: Enviar el reporte de ventas al director de ventas"
          {...register("description", {
            required: "La descripión es obligatoria",
          })}
        />
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
