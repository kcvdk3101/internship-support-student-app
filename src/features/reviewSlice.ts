import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  review: [],
}

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: {},
})

export const {} = reviewSlice.actions

export default reviewSlice.reducer
