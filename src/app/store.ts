import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../features/authenticationSlice'
import cvReducer from '../features/cvSlice'
import corpReducer from '../features/corporationSlice'

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    cv: cvReducer,
    corp: corpReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
