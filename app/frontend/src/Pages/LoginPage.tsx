import { ErrorMessage } from "../Components/ErrorMessage"
import { useForm } from "react-hook-form";
import type { LoginData } from "../types/types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";


export const LoginPage = () => {

    const initialValues: LoginData = {
        email: "",
        password: ""
    }
    const { handleSubmit, register, formState: { errors } } = useForm({ defaultValues: initialValues })
    const { signin } = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data: LoginData) => {
        // Corrobora que el usuario exista en la base de datos
        const user = await signin(data)
        if (typeof user === 'string' || typeof user === "undefined") return toast.warning(user)
        toast('Sesión iniciada correctamente')
        navigate("/tasks")
    })

    return (
        <form onSubmit={onSubmit} className="p-4 rounded-md shadow-md max-w-3xl mx-auto">
            <h1 className="text-3xl font-black my-2">Login</h1>
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
                className="bg-gray-500 hover:bg-gray-700 w-full flex mx-auto p-2 rounded-sm text-white uppercase font-bold cursor-pointer transition-colors"
                value={"Ingresar"}
            />
            <div>
                <p>No tenes usuario? <Link to="/register" className="cursor-pointer font-semibold">Registrarse</Link></p>
            </div>
        </form>
    )
}

