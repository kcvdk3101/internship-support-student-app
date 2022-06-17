import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cvApi from '../api/university/cvApi'
import { CertificatedModel } from '../models/certificated.model'
import { ContactModel } from '../models/contact.model'
import { CVModel } from '../models/cv.model'
import { ProjectModel } from '../models/project.model'

type CVSliceStateProps = {
  fetchingCVs: boolean
  CVs: CVModel[]
  curCV: CVModel
}

export const getCVByStudentId = createAsyncThunk(
  'cv/getCVByStudentId',
  async ({ studentId, limit, offset }: { studentId: string; limit: number; offset: number }) => {
    const response = await cvApi.getCV(studentId, limit, offset)
    return response
  },
)

export const addNewCV = createAsyncThunk(
  'cv/addNewCV',
  async ({ studentId, data }: { studentId: string; data: FormData }) => {
    const response = await cvApi.addNewCV(studentId, data)
    return response
  },
)

export const addContactInformation = createAsyncThunk(
  'cv/addContactInformation',
  async ({ cvId, contacts }: { cvId: string; contacts: ContactModel[] }) => {
    const response = await cvApi.addContact(cvId, contacts)
    return response
  },
)

export const addSkill = createAsyncThunk(
  'cv/addSkill',
  async ({
    cvId,
    skills,
  }: {
    cvId: string
    skills: {
      name: string
      rating: number
    }[]
  }) => {
    const response = await cvApi.addSkill(cvId, skills)
    return response
  },
)

export const addNewProject = createAsyncThunk(
  'cv/addNewProject',
  async ({ cvId, project }: { cvId: string; project: ProjectModel[] }) => {
    const response = await cvApi.addNewProject(cvId, project)
    return response
  },
)

export const addNewCertificated = createAsyncThunk(
  'cv/addNewCertificated',
  async ({ cvId, certificated }: { cvId: string; certificated: CertificatedModel[] }) => {
    const response = await cvApi.addNewCertificated(cvId, certificated)
    return response
  },
)

const initialState: CVSliceStateProps = {
  fetchingCVs: false,
  CVs: [],
  curCV: {
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
  },
}

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    addCVName(state, action) {
      state.curCV.name = action.payload
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
    // Add new CV (files, studentName, position, content, name)
    builder.addCase(addNewCV.pending, (state, action) => {})
    builder.addCase(addNewCV.fulfilled, (state, action) => {})
    builder.addCase(addNewCV.rejected, (state, action) => {})

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
  addCVName,
  addProject,
  addCertification,
  deleteProject,
  deleteCertification,
} = cvSlice.actions

export default cvSlice.reducer
