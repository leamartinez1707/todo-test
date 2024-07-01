import axios from './axios.ts'
import { LoginData, RegisterData, User } from '../types/types.ts';

// export const registerRequest = async (user: RegisterData) => {
//     try {
//         const { data } = await axios.post('/auth/register', user);
//         return data
//     } catch (error: string | any) {
//         if (typeof error.response.data.message === 'string') return error.response.data.message
//         return error.response.data.message[0]
//     }
// }

export const registerRequest = (user: RegisterData) => axios.post('/api/register', user);

export const loginRequest = async (user: LoginData) => {
    try {
        const { data } = await axios.post('/auth/login', user);
        localStorage.setItem('token', data.token)
        return data
    } catch (error: string | any) {
        if (typeof error.response.data.message === 'string') return error.response.data.message
        return error.response.data.message[0]
    }
}

export const getProfile = async () => {
    const { data } = await axios.get<Pick<User, 'id' | 'email' | 'name'>>('/auth/me')
    return data
}

export const logoutRequest = () => axios.post('/logout')