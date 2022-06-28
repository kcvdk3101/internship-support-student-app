import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cvApi from '../api/university/cvApi'
import { CVModel } from '../models/cv.model'

type CVSliceStateProps = {
  CVs: CVModel[]
  curCV: CVModel
  cvId: string
}

export const getCVByStudentId = createAsyncThunk(
  'cv/getCVByStudentId',
  async ({ studentId, limit, offset }: { studentId: string; limit: number; offset: number }) => {
    const response = await cvApi.getCV(studentId, limit, offset)
    return response.data
  },
)

const initialState: CVSliceStateProps = {
  CVs: [],
  curCV: {
    id: '',
    name: '',
    studentName: '',
    position: '',
    content: '',
    details: {
      student: [],
      contacts: [],
      skills: [],
      certificated: [],
      project: [],
    },
    images: [],
  },
  cvId: '',
}

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    saveCVId(state, action) {
      state.cvId = action.payload
    },
    addCVName(state, action) {
      state.curCV.name = action.payload.name
      state.curCV.images = [action.payload.data]
    },
    addListSkill(state, action) {
      state.curCV.details.skills = action.payload
    },
    addProject(state, action) {
      state.curCV.details.project.push(action.payload)
    },
    deleteProject(state, action) {
      let findIndex = state.curCV.details.project.findIndex((p) => p.projectName === action.payload)
      state.curCV.details.project.splice(findIndex, 1)
    },
    addCertification(state, action) {
      state.curCV.details.certificated.push(action.payload)
    },
    deleteCertification(state, action) {
      let findIndex = state.curCV.details.certificated.findIndex((p) => p.name === action.payload)
      state.curCV.details.certificated.splice(findIndex, 1)
    },
  },
  extraReducers: (builder) => {
    // Get CVs by student Id
    builder.addCase(getCVByStudentId.pending, (state) => {
      state.CVs = []
    })
    builder.addCase(getCVByStudentId.fulfilled, (state, action) => {
      state.CVs = action.payload
    })
    builder.addCase(getCVByStudentId.rejected, (state, action) => {
      state.CVs = []
    })
  },
})

export const {
  addListSkill,
  saveCVId,
  addCVName,
  addProject,
  addCertification,
  deleteProject,
  deleteCertification,
} = cvSlice.actions

export default cvSlice.reducer
