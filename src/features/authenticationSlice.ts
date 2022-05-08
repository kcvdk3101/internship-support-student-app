import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { State } from 'react-native-gesture-handler'
import { FIRST_TIME_OPEN_VALUE, IS_FIRST_TIME } from '../constant'
import { StudentModel } from '../models/student.model'

type AuthenticationSliceStateProps = {
  user: StudentModel | null
  isAuthenticated: boolean
  isFirstTimeOpen: boolean
}

const initialState: AuthenticationSliceStateProps = {
  user: null,
  isAuthenticated: false,
  isFirstTimeOpen: false,
}

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openedApp(state, action) {
      AsyncStorageLib.setItem(IS_FIRST_TIME, JSON.stringify(FIRST_TIME_OPEN_VALUE))
      state.isFirstTimeOpen = true
    },
    login(state, action) {
      state.user = {
        id: '603E8F2C-430C-4010-8874-105CDE9366DA',
        firstName: 'Khôi',
        lastName: 'Vương Đình',
        fullName: 'Vương Đình Khôi',
        email: '18dh110815@st.huflit.edu.vn',
        birthDate: '01/30/2000',
        identityNumber: '18DH110815',
        address: '882 Ngo Quyen Street, Ho Chi Minh City,Vietnam',
        phoneNumber: '0777724500',
        class: 'PM1804',
        term: 'K24',
        status: 'Chưa thực tập',
        academicYear: 'K24',
        slug: 'vuong-dinh-khoi',
        isActive: true,
        isRegistered: true,
        createdAt: '2022-05-05T15:06:46.000Z',
        updatedAt: '2022-05-05T15:06:46.000Z',
      }
      state.isAuthenticated = true
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
    },
  },
  extraReducers: {},
})

const { actions, reducer } = authenticationSlice

export const { openedApp, login, logout } = actions

export default reducer
