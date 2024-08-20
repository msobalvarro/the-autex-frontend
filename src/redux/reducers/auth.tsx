import { ResponseAuth } from '@/interfaces'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ResponseAuth = {
  _id: null,
  email: null,
  token: null,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionReducer: (state: ResponseAuth, action) => {
      state.token = action.payload.token
      state.email = action.payload.email
      state._id = action.payload._id
    },
    clearSessionReducer: (state) => {
      state = initialState
    },
  },
})
