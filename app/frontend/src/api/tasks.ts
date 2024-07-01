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
export const getTaskById = async (id: Task['id']) => {
    try {
        const { data } = await axios.get(`/tasks/${id}`);
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
export const updateTask = async (id: number, task: TaskFormData) => {
    try {
        const { data } = await axios.put(`/tasks/${id}`, task);
        return data
    } catch (error: string | any) {
        if (typeof error.response.data.message === 'string') return error.response.data.message
        return error.response.data.message[0]
    }
}
export const deleteTask = async (id: Task['id']) => {
    try {
        const { data } = await axios.delete(`/tasks/${id}`);
        return data
    } catch (error: string | any) {
        if (typeof error.response.data.message === 'string') return error.response.data.message
        return error.response.data.message[0]
    }
}
export const updateState = async (id: number) => {
    try {
        const { data } = await axios.put(`/tasks/updateState/${id}`);
        return data
    } catch (error: string | any) {

        if (typeof error.response.data.message === 'string') return error.response.data.message
        return error.response.data.message[0]
    }
}