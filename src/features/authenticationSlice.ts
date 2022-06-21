import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from '../api/user/userApi'
import { FIRST_TIME_OPEN_VALUE, IS_FIRST_TIME } from '../constant'
import { UserModel } from '../models/user.model'

type AuthenticationSliceStateProps = {
  user: UserModel
  isAuthenticated: boolean
  isFirstTimeOpen: boolean
  hasChangedPassword: boolean
  hasResetPassword: boolean
}

const initialState: AuthenticationSliceStateProps = {
  user: {
    studentId: '',
    id: '',
    email: '',
  },
  isAuthenticated: false,
  isFirstTimeOpen: false,
  hasChangedPassword: false,
  hasResetPassword: false,
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

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({
    userId,
    data,
  }: {
    userId: string
    data: { currentPassword: string; newPassword: string }
  }) => {
    const result = await userApi.changePassword(userId, data)
    return result
  },
)

export const resetPassword = createAsyncThunk('auth/resetPassword', async (email: string) => {
  const response = await userApi.resetPassword(email)
  return response
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
      AsyncStorageLib.setItem('student_id', JSON.stringify(action.payload.id))

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
        studentId: '',
        id: '',
        email: '',
      }
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.isAuthenticated = true
    })

    // Change password
    builder.addCase(changePassword.pending, (state) => {
      state.hasChangedPassword = false
    })

    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.hasChangedPassword = action.payload.result
    })
    builder.addCase(changePassword.rejected, (state) => {
      state.hasChangedPassword = false
    })

    // Reset password
    builder.addCase(resetPassword.pending, (state) => {
      state.hasResetPassword = false
    })

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.hasResetPassword = action.payload.result
    })
    builder.addCase(resetPassword.rejected, (state) => {
      state.hasResetPassword = false
    })
  },
})

const { actions, reducer } = authenticationSlice

export const { openedApp } = actions

export default reducer
