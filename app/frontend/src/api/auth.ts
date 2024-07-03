import axios from './axios.ts'
import { LoginData, RegisterData, User } from '../types/types.ts';


export const registerRequest = (user: RegisterData) => axios.post('/auth/register', user);

export const loginRequest = (user: LoginData) => axios.post('/auth/login', user);

export const getProfile = async () => {
    const { data } = await axios.get<Pick<User, 'id' | 'email' | 'name'>>('/auth/me')
    return data
}

export const logoutRequest = () => axios.post('/auth/logout')