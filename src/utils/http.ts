import axios from 'axios'
import { getToken, logoutService } from './auth'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
})

axios.interceptors.response.use(
  async (e) => {
    if (e.status === 401) {
      await logoutService()
    }

    return e
  },
  (error) => error,
  {
    synchronous: true,
  }
)

axiosInstance.interceptors.request.use(
  async config => {
    const token = await getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {    
    return Promise.reject(error.message)
  }
)

export { axiosInstance }
