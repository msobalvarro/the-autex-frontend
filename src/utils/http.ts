import axios from 'axios'
import { getToken, logoutService } from './auth'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
})

axiosInstance.interceptors.request.use(
  async config => {
    const token = await getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(e => e, async reject => {
  if (reject?.response?.status === 401) {
    await logoutService()
  }

  return Promise.reject(reject)
})
