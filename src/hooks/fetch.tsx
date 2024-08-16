
import { axiosInstance } from '@/utils/http'
import { useState, useCallback, useEffect } from 'react'

interface Props {
  endpoint: string
}

export const useAxios = ({ endpoint }: Props) => {
  const [data, setData] = useState(null)
  const [status, setStatus]= useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const response = await axiosInstance({ url: endpoint, method: 'GET' })
      setStatus(response.status)
      setData(response.data)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, status, refetch: fetchData }
}
