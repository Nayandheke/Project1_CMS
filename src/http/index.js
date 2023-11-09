import axios from "axios"
import { toast } from "react-toastify"

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

http.interceptors.response.use(resp=> {
    if('success' in resp.data) {
        toast.success(resp.data.success)
    }
    return resp
}, err => {
    if('response' in err && 'error' in err.response.data) {
        toast.error(err.response.data.error)
    }
    return Promise.reject(err)
})

export default http