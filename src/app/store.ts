import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../features/authenticationSlice'
import cvReducer from '../features/cvSlice'
import corpReducer from '../features/corporationSlice'
import jobReducer from '../features/jobSlice'

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    cv: cvReducer,
    corp: corpReducer,
    job: jobReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
