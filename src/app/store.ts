import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../features/authenticationSlice'
import cvReducer from '../features/cvSlice'

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    cv: cvReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
