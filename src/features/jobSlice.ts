import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import jobApi from '../api/corporation/jobApi'
import { CorporationModel } from '../models/corporation.model'
import { JobModel } from '../models/job.model'

export interface JobSliceState {
  status: 'loading' | 'idle' | 'fail'
  jobs: JobModel[]
  jobsInCorp: JobModel[]
}

const initialState: JobSliceState = {
  status: 'idle',
  jobs: [],
  jobsInCorp: [],
}

export const getAllJobInCorporation = createAsyncThunk(
  'job/getAllJobInCorporation',
  async (id: string) => {
    const response = await jobApi.getAllJobInCorporation(id)
    return response.data
  },
)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllJobInCorporation.pending, (state, action) => {
      state.status = 'loading'
      state.jobsInCorp = []
    })

    builder.addCase(getAllJobInCorporation.fulfilled, (state, action) => {
      state.status = 'idle'
      state.jobsInCorp = action.payload
    })

    builder.addCase(getAllJobInCorporation.rejected, (state, action) => {
      state.status = 'fail'
      state.jobsInCorp = []
    })
  },
})

export const {} = jobSlice.actions

export default jobSlice.reducer
