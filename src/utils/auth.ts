import { ResponseAuth } from '@/interfaces'
import { sessionSlice } from '@/redux/reducers/auth'
import store from '@/redux'

export const LOCAL_KEY = 'session'

export const getSession = async (): Promise<ResponseAuth | null> => {
  const auth = localStorage.getItem(LOCAL_KEY)
  
  if (!auth) {
    return null
  }

  const response: ResponseAuth = JSON.parse(auth)  
  return response
}

export const setSession = async (data: ResponseAuth): Promise<void> => {
  await localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
  store.dispatch(sessionSlice.actions.setSessionReducer(data))
}

export const removeSession = async (): Promise<void> => {
  await localStorage.removeItem(LOCAL_KEY)
  store.dispatch(sessionSlice.actions.clearSessionReducer())
}

export const getToken = async (): Promise<string | null> => {
  const response = await getSession()
  return response?.token || null
}
