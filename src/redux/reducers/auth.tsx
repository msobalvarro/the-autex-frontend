import { AuthStore } from '@/interfaces'
import { createSlice } from '@reduxjs/toolkit'

const initialState: AuthStore = {
  _id: null,
  email: null,
  token: null,
  name: null,
  workshop: null,
  isAdmin: false,
  isRoot: false,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionReducer: (state: AuthStore, action) => {
      state._id = action.payload._id
      state.email = action.payload.email
      state.token = action.payload.token
      state.isRoot = action.payload.isRoot
      state.isAdmin = action.payload.isAdmin
      state.workshop = action.payload.workshop
    },
    // @ts-ignore
    clearSessionReducer: (state) => {
      state = initialState
    },
  },
})
