import axios from './axios.ts'
import { LoginData, RegisterData } from '../types/types.ts';

export const registerRequest = async (user: RegisterData) => {
    try {
        const { data } = await axios.post('/api/auth/register', user);
        return data
    } catch (error: string | any) {
        if (typeof error.response.data.message === 'string') return error.response.data.message
        return error.response.data.message[0]
    }
}

export const loginRequest = async (user: LoginData) => {
    try {
        const { data } = await axios.post('/api/auth/login', user);
        localStorage.setItem('token', data.token)
        return data
    } catch (error: string | any) {
        if (typeof error.response.data.message === 'string') return error.response.data.message
        return error.response.data.message[0]
    }
}

export const verifyTokenRequest = async () => {
    const { data } = await axios.get('/api/auth/me')
    return data
}

export const logoutRequest = () => axios.post('/api/logout')