/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from 'react'
import { registerRequest } from '../api/auth.js'
import { LoginData, RegisterData, UserInfo } from '../types/types.js'
// import Cookies from 'js-cookie'



type AuthContextProps = {
    signup: (user: RegisterData) => Promise<any>
    user: UserInfo | undefined
    isAuthenticated: boolean
}


type AuthProviderProps = {
    children: React.ReactNode
}


export const AuthContext = createContext<AuthContextProps>(null!)

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<UserInfo>()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    // const [errors, setErrors] = useState([])
    // const [loading, setLoading] = useState(true)


    // Funcion para realizar el registro mediante los datos obtenidos en el body del formulario
    const signup = async (values: RegisterData) => {
        try {
            const { data } = await registerRequest(values)
            setUser(data)
            return data
        } catch (error: string | any) {
            if (typeof error.response.data.message === 'string') return error.response.data.message
            return error.response.data.message[0]
        }
    }
    // Funcion para realizar el login mediante los datos obtenidos en el body del formulario
    // const signin = async (user) => {
    //     try {
    //         setLoading(true)
    //         const res = await loginRequest(user)
    //         Cookies.set("access_token", res.data.token, { expires: 3 })
    //         const { access_token } = Cookies.get();
    //         const auth = await verifyTokenRequest(access_token);
    //         if (!auth) {
    //             setUser(null)
    //             setIsAuthenticated(false)
    //             setErrors(['No se pudo verificar el token'])
    //             return;
    //         }
    //         setUser(res.data)
    //         setIsAuthenticated(true)
    //     } catch (error) {
    //         if (!error.response.data.message) return setErrors([error.message])
    //         setErrors(error.response.data.message)
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // const logout = async () => {
    //     try {
    //         await logoutRequest()
    //         Cookies.remove()
    //         Cookies.remove("access_token")
    //         setUser(null)
    //         setIsAuthenticated(false)
    //     } catch (error) {
    //         if (!error.response.data.message) return setErrors([error.message])
    //         setErrors(error.response.data.message)
    //     }
    // }

    // // Elimina los errores del formulario luego de 5 segundos.
    // useEffect(() => {
    //     if (errors.length > 0) {
    //         const timer = setTimeout(() => {
    //             setErrors([])
    //         }, 5000);
    //         return () => clearTimeout(timer)
    //     }
    // }, [errors])


    // useEffect(() => {
    //     const checkLogin = async () => {
    //         // Setea la cookie recibida por el navegador si es que existe una guardada
    //         const cookie = Cookies.get()
    //         // Si el usuario no existe y no se generá un token, no lo dejamos ingresar a la página.
    //         // utilizar cookie.access_token
    //         if (!cookie.access_token) {
    //             setIsAuthenticated(false)
    //             setLoading(false)
    //             setUser(null)
    //             return;
    //         }
    //         try {
    //             // Si existe un token guardado en el navegador, se envia al backend y este verifica si es correcto
    //             const { data } = await verifyTokenRequest(cookie.access_token)
    //             if (!data) return setIsAuthenticated(false)
    //             // El usuario existe y el token no dió problema
    //             setIsAuthenticated(true)
    //             setUser(data)
    //             setLoading(false)

    //         } catch (error) {
    //             setIsAuthenticated(false)
    //             setLoading(false)
    //             setUser(null)
    //         }
    //     };
    //     // Ejecutamos la función
    //     checkLogin()
    // }, [])


    return (
        <AuthContext.Provider value={{
            signup,
            user,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}