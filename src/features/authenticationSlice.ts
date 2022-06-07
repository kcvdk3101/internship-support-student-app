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
    // login(state, action) {
    //   state.user = {
    //     id: '9E746DB7-7DF5-4009-9A08-7FF7039B82EB',
    //     firstName: 'Khôi',
    //     lastName: 'Vương Đình',
    //     fullName: 'Vương Đình Khôi',
    //     email: '18dh110815@st.huflit.edu.vn',
    //     birthDate: '01/30/2000',
    //     identityNumber: '18DH110815',
    //     address: '882 Ngo Quyen Street, Ho Chi Minh City,Vietnam',
    //     phoneNumber: '0777724500',
    //     class: 'PM1804',
    //     term: 'K24',
    //     status: 'Chưa thực tập',
    //     academicYear: 'K24',
    //     slug: 'vuong-dinh-khoi',
    //     isActive: true,
    //     isRegistered: true,
    //     createdAt: '2022-05-20T16:53:39.000Z',
    //     updatedAt: '2022-05-20T16:53:39.000Z',
    //   }
    //   state.isAuthenticated = true
    // },
    // logout(state) {
    //   state.user = null
    //   state.isAuthenticated = false
    // },
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
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.isAuthenticated = true
    })
  },
})

const { actions, reducer } = authenticationSlice

export const { openedApp } = actions

export default reducer
