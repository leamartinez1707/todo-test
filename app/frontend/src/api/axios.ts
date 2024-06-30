import axios from "axios";
// import { VITE_URL } from "../config.ts";


const api = axios.create({
    baseURL: `/api/`,
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