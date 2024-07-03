/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from 'react'
import { getProfile, loginRequest, logoutRequest, registerRequest } from '../api/auth.js'
import { LoginData, RegisterData, UserInfo } from '../types/types.js'
// import Cookies from 'js-cookie'



type AuthContextProps = {
    signup: (user: RegisterData) => Promise<void>
    signin: (user: LoginData) => Promise<void>
    logout: () => Promise<void>
    user: UserInfo | null
    isAuthenticated: boolean
}


type AuthProviderProps = {
    children: React.ReactNode
}


export const AuthContext = createContext<AuthContextProps>(null!)

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<UserInfo | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    // const [errors, setErrors] = useState([])
    // const [loading, setLoading] = useState(true)

    // Funcion para realizar el registro mediante los datos obtenidos en el body del formulario
    const signup = async (values: RegisterData) => {
        try {
            const { data } = await registerRequest(values)
            return data
        } catch (error: any) {
            setIsAuthenticated(false)
            if (typeof error.response.data.message === 'string') return error.response.data.message
            return error.response.data.message[0]
        }
    }
    //Funcion para realizar el login mediante los datos obtenidos en el body del formulario
    const signin = async (user: LoginData) => {
        try {
            const { data } = await loginRequest(user)
            localStorage.setItem('token', data.token)
            const profile = await getProfile()
            if (!profile) {
                setUser(null)
                setIsAuthenticated(false)
                return;
            }
            setUser(profile)
            setIsAuthenticated(true)
            return data
        } catch (error: any) {
            if (typeof error.response.data.message === 'string') return error.response.data.message
            setUser(null)
            setIsAuthenticated(false)
            return error.response.data.message[0]
            // } finally {
            //     setLoading(false);
            // }
        }
    }

    const logout = async () => {
        try {
            await logoutRequest()
            localStorage.removeItem('token')
            setUser(null)
            setIsAuthenticated(false)
            return ('Sesión cerrada correctamente')
        } catch (error: any) {
            if (typeof error.response.data.message === 'string') return error.response.data.message
            return error.response.data.message[0]
        }
    }

    useEffect(() => {
        const checkLogin = async () => {
            // Setea la cookie recibida por el navegador si es que existe una guardada
            const cookie = localStorage.getItem('token')
            // Si el usuario no existe y no se generá un token, no lo dejamos ingresar a la página.
            // utilizar cookie.access_token
            if (!cookie) {
                setIsAuthenticated(false)
                setUser(null)
                return;
            }
            try {
                // Si existe un token guardado en el navegador, se envia al backend y este verifica si es correcto
                const userFound = await getProfile()
                if (!userFound) return setIsAuthenticated(false)
                // El usuario existe y el token no dió problemas, por lo que se setea el usuario y se le permite el acceso
                setIsAuthenticated(true)
                setUser(userFound)
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
            }
        };
        // Ejecutamos la función
        checkLogin()
    }, [])


    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            user,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}