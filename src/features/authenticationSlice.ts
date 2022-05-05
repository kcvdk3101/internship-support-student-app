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
    login(state, action) {},
  },
  extraReducers: {},
})

const { actions, reducer } = authenticationSlice

export const { openedApp } = actions

export default reducer
