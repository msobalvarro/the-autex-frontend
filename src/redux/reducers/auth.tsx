import { ResponseAuth } from '@/interfaces'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ResponseAuth = {
  token: null,
  email: '',
  _id: null,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionReducer: (state, action) => {
      state.token = action.payload.token
      state.email = action.payload.email
      state._id = action.payload._id
    },
    clearSessionReducer: (state) => {
      state.token = null
      state.email = null
      state._id = null
    },
  },
})
