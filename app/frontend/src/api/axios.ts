import axios from "axios";
import { VITE_API_HOST } from "../config";


const api = axios.create({
    baseURL: VITE_API_HOST,
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}
)

const instance = api
export default instance;