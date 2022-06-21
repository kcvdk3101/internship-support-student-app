import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import corporationApi from '../api/corporation/corporationApi'
import { CorporationModel } from '../models/corporation.model'

export interface CorporationsSliceState {
  status: 'loading' | 'idle' | 'fail'
  corporations: CorporationModel[]
  corporationsByLimit: CorporationModel[]
}

const initialState: CorporationsSliceState = {
  status: 'idle',
  corporations: [],
  corporationsByLimit: [],
}

export const getCorporations = createAsyncThunk(
  'corporation/getCorporations',
  async ({ limit, offset }: { limit: number; offset: number }) => {
    const corporations = await corporationApi.getCorporations({ limit, offset })
    return corporations
  },
)

export const getCorporationsByLimit = createAsyncThunk(
  'corporation/getCorporationsByLimit',
  async (limit: number) => {
    const corporationsByLimit = await corporationApi.getCorporationsByLimit(limit)
    return corporationsByLimit.data
  },
)

export const getCorporationsById = createAsyncThunk(
  'corporation/getCorporationsById',
  async (id: string) => {
    const getCorporationsById = await corporationApi.getCorporationById(id)
    return getCorporationsById.corporation
  },
)

const corporationSlice = createSlice({
  name: 'corporation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get corporation by limit and offset
    builder.addCase(getCorporations.pending, (state, action) => {
      state.status = 'loading'
      state.corporations = []
    })
    builder.addCase(getCorporations.fulfilled, (state, action) => {
      state.status = 'idle'
      state.corporations = action.payload.data
    })
    builder.addCase(getCorporations.rejected, (state, action) => {
      state.status = 'fail'
      state.corporations = []
    })

    // Get corporations by limit
    builder.addCase(getCorporationsByLimit.pending, (state, action) => {
      state.status = 'loading'
      state.corporationsByLimit = []
    })
    builder.addCase(getCorporationsByLimit.fulfilled, (state, action: any) => {
      state.status = 'idle'
      state.corporationsByLimit = action.payload
    })
    builder.addCase(getCorporationsByLimit.rejected, (state, action) => {
      state.status = 'fail'
      state.corporationsByLimit = []
    })
  },
})

export const {} = corporationSlice.actions

export default corporationSlice.reducer
