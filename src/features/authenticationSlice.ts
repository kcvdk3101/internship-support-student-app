import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { State } from 'react-native-gesture-handler'
import { FIRST_TIME_OPEN_VALUE, IS_FIRST_TIME } from '../constant'
import { StudentModel } from '../models/student.model'
import userApi from '../api/user/userApi'
import { UserModel } from '../models/user.model'

type AuthenticationSliceStateProps = {
  user: UserModel
  isAuthenticated: boolean
  isFirstTimeOpen: boolean
}

const initialState: AuthenticationSliceStateProps = {
  user: {
    id: '',
    email: '',
  },
  isAuthenticated: false,
  isFirstTimeOpen: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const user = await userApi.login(email, password)
    return user.user
  },
)

export const logout = createAsyncThunk('auth/logout', async () => {
  const user = await userApi.logout()
  return user
})

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openedApp(state, action) {
      AsyncStorageLib.setItem(IS_FIRST_TIME, JSON.stringify(FIRST_TIME_OPEN_VALUE))
      state.isFirstTimeOpen = true
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state, action) => {
      state.isAuthenticated = false
    })

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isAuthenticated = false
    })

    // Logout
    builder.addCase(logout.pending, (state, action) => {
      state.isAuthenticated = true
    })

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthenticated = false
      state.user = {
        id: '',
        email: '',
      }
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.isAuthenticated = true
    })
  },
})

const { actions, reducer } = authenticationSlice

export const { openedApp } = actions

export default reducer
