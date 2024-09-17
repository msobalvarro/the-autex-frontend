import store from '@/redux'
import { AuthStore } from '@/interfaces'
import { useEffect, useState } from 'react'
import { getSession } from '@/utils/auth'
import { sessionSlice } from '@/redux/reducers/auth'

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthStore | null>(null)

  const getSomeSession = async () => {
    const session: AuthStore | null = await getSession()
    if (session) {
      store.dispatch(sessionSlice.actions.setSessionReducer(session))
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