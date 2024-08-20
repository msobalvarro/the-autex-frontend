import { ResponseAuth } from '@/interfaces'
import { sessionSlice } from '@/redux/reducers/auth'
import store from '@/redux'

export const LOCAL_KEY = 'session'

export const getSession = async (): Promise<ResponseAuth | null> => {
  const auth = await localStorage.getItem(LOCAL_KEY)
  if (!auth) {
    return null
  }

  const response: ResponseAuth = JSON.parse(auth)
  return response
}

export const setSession = async (data: ResponseAuth): Promise<void> => {
  store.dispatch(sessionSlice.actions.setSessionReducer(data))
  await localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
}
