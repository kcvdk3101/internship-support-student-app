import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import reviewApi from '../api/corporation/reviewApi'
import { Review } from '../models/review.model'

const initialState = {
  review: [],
}

export const addNewReview = createAsyncThunk(
  'review/addNewReview',
  async ({ corporationId, review }: { corporationId: string; review: Review[] }) => {
    const response = await reviewApi.addNewReview(corporationId, review)
    return response
  },
)

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
})

export const {} = reviewSlice.actions

export default reviewSlice.reducer
