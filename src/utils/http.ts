import axios from 'axios'
import { getToken, logoutService } from './auth'

const axiosInstance = axios.create({
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

axios.interceptors.response.use(async (e) => {
  if (e.status === 401) {
    await logoutService()
  }

  return e
}, async reject => {
  console.log(reject)
  
  return reject
})

export { axiosInstance }
