import { createSlice } from '@reduxjs/toolkit'
import { CVModel } from '../models/index'

type CVSliceStateProps = {
  cv: CVModel | null
}

const initialState: CVSliceStateProps = {
  cv: null,
}

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {},
  extraReducers: {},
})

export const {} = cvSlice.actions

export default cvSlice.reducer
