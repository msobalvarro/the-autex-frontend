
import { logoutService } from '@/utils/auth'
import { axiosInstance } from '@/utils/http'
import { AxiosError } from 'axios'
import { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

interface Props {
  endpoint: string
  data?: object
}

export const useAxios = ({ endpoint, data: dataBody }: Props) => {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const response = await axiosInstance({
        url: endpoint,
        method: 'GET',
        data: dataBody,
      })
      if (response.status === 401) {
        await logoutService()
      }

      setStatus(response.status)
      setData(response.data)
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ERR_NETWORK') {
          toast.error(`Connection refused`)
        } else {
          toast.warning(`${err?.response?.data}`)
        }

        setError(String(err?.response?.data))
      }
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, status, refetch: fetchData }
}
