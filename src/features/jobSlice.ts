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

export const getAllJobsInCorporation = createAsyncThunk(
  'job/getAllJobsInCorporation',
  async (id: string) => {
    const response = await jobApi.getAllJobsInCorporation(id)
    return response.data
  },
)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllJobsInCorporation.pending, (state, action) => {
      state.status = 'loading'
      state.jobsInCorp = []
    })

    builder.addCase(getAllJobsInCorporation.fulfilled, (state, action) => {
      state.status = 'idle'
      state.jobsInCorp = action.payload
    })

    builder.addCase(getAllJobsInCorporation.rejected, (state, action) => {
      state.status = 'fail'
      state.jobsInCorp = []
    })
  },
})

export const {} = jobSlice.actions

export default jobSlice.reducer
