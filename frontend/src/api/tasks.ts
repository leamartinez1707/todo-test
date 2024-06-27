// import { Task } from '../types/types.ts';
import axios from './axios.ts'


export const getTasks = async () => {
    try {
        const { data } = await axios.get('/api/tasks');
        return data
    } catch (error: string | any) {
        if (typeof error.response.data.message === 'string') return error.response.data.message
        return error.response.data.message[0]
    }
}