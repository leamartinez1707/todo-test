import type { Task, TaskFormData } from '../types/types';
import axios from './axios'


export const getTasks = async () => {
    try {
        const { data } = await axios.get('/tasks');
        return data
    } catch (error: string | any) {
        if (typeof error.response.data.message === 'string') return error.response.data.message
        return error.response.data.message[0]
    }
}
export const createTask = async (task: TaskFormData) => {
    try {
        const { data } = await axios.post('/tasks', task);
        return data
    } catch (error: string | any) {
        if (typeof error.response.data.message === 'string') return error.response.data.message
        return error.response.data.message[0]
    }
}
export const updateTask = async (task: Task) => {
    try {
        const { data } = await axios.post('/tasks', task);
        return data
    } catch (error: string | any) {
        if (typeof error.response.data.message === 'string') return error.response.data.message
        return error.response.data.message[0]
    }
}
export const deleteTask = async (task: TaskFormData) => {
    try {
        const { data } = await axios.post('/tasks', task);
        return data
    } catch (error: string | any) {
        if (typeof error.response.data.message === 'string') return error.response.data.message
        return error.response.data.message[0]
    }
}