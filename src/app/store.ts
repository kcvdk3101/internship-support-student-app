import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../features/authenticationSlice'
export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
