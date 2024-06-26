import axios from './axios.ts'
import { User } from '../types/types.ts';

export const registerRequest = (user: User) => axios.post('/api/register', user);

export const loginRequest = (user: User) => axios.post('/api/login', user)

export const verifyTokenRequest = () => axios.get('/api/verifytoken')

export const logoutRequest = () => axios.post('/api/logout')