import { configureStore } from '@reduxjs/toolkit'
import { sessionSlice } from './reducers/auth'

export const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
  },
})

export default store