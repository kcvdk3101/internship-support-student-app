import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { State } from 'react-native-gesture-handler'
import { FIRST_TIME_OPEN_VALUE, IS_FIRST_TIME } from '../constant'
import { User } from '../models/user'

type AuthenticationSliceStateProps = {
  user: User
  isAuthenticated: boolean
  isFirstTimeOpen: boolean
}

const initialState: AuthenticationSliceStateProps = {
  user: {
    firstName: 'Khoi',
    lastName: 'Vuong',
    phone: '0934105563',
    email: '18DH110815@st.huflit.edu.vn',
    image: 'https://picsum.photos/200',
    cvList: [],
  },
  isAuthenticated: false,
  isFirstTimeOpen: false,
}

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openedApp(state, action) {
      AsyncStorageLib.setItem(
        IS_FIRST_TIME,
        JSON.stringify(FIRST_TIME_OPEN_VALUE),
      )
      state.isFirstTimeOpen = true
    },
  },
  extraReducers: {},
})

const { actions, reducer } = authenticationSlice

export const { openedApp } = actions

export default reducer
