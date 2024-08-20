import { ResponseAuth } from '@/interfaces'
import { useEffect, useState } from 'react'
import { getSession, setSession } from '@/utils/auth'
import store from '@/redux'

export const useAuth = () => {
  const [auth, setAuth] = useState<ResponseAuth | null>(null)

  const getSomeSession = async () => {
    const session: ResponseAuth | null = await getSession()
    if (session) {
      await setSession(session)
      setAuth(session)
    }
  }

  useEffect(() => {
    const subsribe = store.subscribe(() => {
      const { session } = store.getState()
      setAuth(session)
    })

    getSomeSession()
    return () => subsribe()
  }, [])

  return { auth }
}