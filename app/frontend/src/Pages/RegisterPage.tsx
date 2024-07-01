import { ErrorMessage } from "../Components/ErrorMessage"
import { useForm } from "react-hook-form";
import type { RegisterData } from "../types/types";
// import { registerRequest } from "../api/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";


export const RegisterPage = () => {

  const initialValues: RegisterData = {
    name: "",
    email: "",
    password: ""
  }
  const { handleSubmit, register, formState: { errors } } = useForm({ defaultValues: initialValues })
  const navigate = useNavigate()
  const { signup } = useAuth()


  const onSubmit = handleSubmit(async (data: RegisterData) => {
    const sign = await signup(data)
    console.log(sign)
    toast(`Usuario creado correctamente`)
    navigate("/login")
  })

  return (
    <form onSubmit={onSubmit} className="shadow-lg rounded-lg p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black my-2">Registro</h1>
      <div className="mb-5 space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Nombre
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre"
          {...register("name", {
            required: "El nombre es obligatorio",
          })}
        />

        {errors.name && (
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="email" className="text-sm uppercase font-bold">
          Email
        </label>
        <input
          id="email"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "El email es obligatorio",
          })}
        />

        {errors.email && (
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="password" className="text-sm uppercase font-bold">
          Password
        </label>
        <input
          id="password"
          className="w-full p-3  border border-gray-200"
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        )}
      </div>
      <input type="submit"
        className="bg-gray-500 hover:bg-gray-700 w-full p-2 rounded-sm text-white uppercase font-bold cursor-pointer transition-colors"
        value={"Registrarse"}
      />
      <div>
        <p>Ya tenes usuario? <Link to="/login" className="cursor-pointer font-semibold">Login</Link></p>
      </div>
    </form>
  )
}

