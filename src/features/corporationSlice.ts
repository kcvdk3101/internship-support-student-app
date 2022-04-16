import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import corporationApi from '../api/corporationApi'
import { Corporation } from '../models/corporation'

export interface CorporationsSliceState {
  corporations: Corporation[]
  corporationsByLimit: Corporation[]
}

const initialState: CorporationsSliceState = {
  corporations: [],
  corporationsByLimit: [],
}

export const getCorporationsByLimit = createAsyncThunk(
  'corporation/getCorporationsByLimit',
  async (limit: number) => {
    const list = corporationApi.getCorporationsByLimit(limit)
    console.log('🚀 ~ file: corporationSlice.ts ~ line 13 ~ list', list)
    return list
  },
)

const corporationSlice = createSlice({
  name: 'corporation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCorporationsByLimit.pending, (state, action) => {
      state.corporationsByLimit = []
    })
    builder.addCase(getCorporationsByLimit.fulfilled, (state, action: any) => {
      state.corporationsByLimit = action.payload
    })
    builder.addCase(getCorporationsByLimit.rejected, (state, action) => {})
  },
})

export const {} = corporationSlice.actions

export default corporationSlice.reducer
