import type { Task, TaskFormData } from '../types/types';
import axios from './axios'


export const getTasksRequest = () => axios.get('/tasks');

export const getTaskByIdRequest = (id: Task['id']) => axios.get(`/tasks/${id}`);

export const createTaskRequest = (task: TaskFormData) => axios.post('/tasks', task);

export const updateTaskRequest = (id: Task['id'], task: TaskFormData) => axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = (id: Task['id']) => axios.delete(`/tasks/${id}`);

export const updateTaskStateRequest = (id: Task['id']) => axios.put(`/tasks/updateState/${id}`);