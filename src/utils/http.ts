import 'dotenv'
import axios from 'axios'
import { getToken, logoutService } from './auth'

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'http://localhost:3000/api',
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
