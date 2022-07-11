import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from '../api/user/userApi'
import { FIRST_TIME_OPEN_VALUE, IS_FIRST_TIME } from '../constant'
import { UserModel } from '../models/user.model'

type AuthenticationSliceStateProps = {
  user: UserModel
  isAuthenticated: boolean
  isFirstTimeOpen: boolean
  hasResetPasswordCode: boolean
  resetPasswordCode: number
  isValid: boolean
  hasChangedPassword: boolean
}

const initialState: AuthenticationSliceStateProps = {
  user: {
    studentId: '',
    id: '',
    email: '',
  },
  isAuthenticated: false,
  isFirstTimeOpen: false,
  hasResetPasswordCode: false,
  resetPasswordCode: 0,
  isValid: false,
  hasChangedPassword: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const user = await userApi.login(email, password)
    if (user.user.role === 'student') {
      AsyncStorageLib.setItem('@password', password)
    }
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

export const resetPasswordCode = createAsyncThunk(
  'auth/resetPasswordCode',
  async (email: string) => {
    const response = await userApi.resetPasswordCode(email)
    return response
  },
)

export const checkIsValidResetPassword = createAsyncThunk(
  'auth/checkIsValidResetPassword',
  async ({ email, resetPasswordCode }: { email: string; resetPasswordCode: number }) => {
    const response = await userApi.checkValidResetPasswordCode(email, resetPasswordCode)
    return response
  },
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await userApi.resetPassword(email, password)
    return response
  },
)

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
      AsyncStorageLib.setItem('@email', action.payload.email)
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

    // Has Reset Password Code
    builder.addCase(resetPasswordCode.pending, (state) => {
      state.hasResetPasswordCode = false
    })

    builder.addCase(resetPasswordCode.fulfilled, (state, action) => {
      state.hasResetPasswordCode = action.payload.result
      state.resetPasswordCode = action.payload.resetPasswordCode
    })
    builder.addCase(resetPasswordCode.rejected, (state) => {
      state.hasResetPasswordCode = false
    })

    // Check isValid Reset Password
    builder.addCase(checkIsValidResetPassword.pending, (state) => {
      state.isValid = false
    })

    builder.addCase(checkIsValidResetPassword.fulfilled, (state, action) => {
      state.isValid = action.payload.isValid
    })
    builder.addCase(checkIsValidResetPassword.rejected, (state) => {
      state.isValid = false
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
  },
})

const { actions, reducer } = authenticationSlice

export const { openedApp } = actions

export default reducer
