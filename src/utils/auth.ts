import { ResponseAuth } from '@/interfaces'

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
  await localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
}
