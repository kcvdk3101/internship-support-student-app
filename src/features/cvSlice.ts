import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cvApi from '../api/university/cvApi'
import { CertificatedModel } from '../models/certificated.model'
import { CVModel } from '../models/cv.model'
import { ProjectModel } from '../models/project.model'
import { Skill } from '../models/skill.model'

type CVSliceStateProps = {
  fetchingCV: boolean
  CVs: CVModel[]
  curCV: CVModel
}

const initialState: CVSliceStateProps = {
  fetchingCV: false,
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
}

export const getCVByStudentId = createAsyncThunk(
  'cv/getCVByStudentId',
  async ({ studentId, limit, offset }: { studentId: string; limit: number; offset: number }) => {
    const response = await cvApi.getCV(studentId, limit, offset)
    return response.data
  },
)

export const addNewCV = createAsyncThunk(
  'cv/addNewCV',
  async ({ studentId, formData }: { studentId: string; formData: FormData }) => {
    const response = await cvApi.addNewCV(studentId, formData)
    return response.data
  },
)

export const addNewSkill = createAsyncThunk(
  'cv/addNewSkill',
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
    return response.data
  },
)

export const addNewContact = createAsyncThunk(
  'cv/addNewContact',
  async ({
    cvId,
    contacts,
  }: {
    cvId: string
    contacts: {
      title: string
      content: string
    }[]
  }) => {
    const response = await cvApi.addContact(cvId, contacts)
    return response.data
  },
)

export const addNewProject = createAsyncThunk(
  'cv/addNewProject',
  async ({ cvId, project }: { cvId: string; project: ProjectModel[] }) => {
    const response = await cvApi.addNewProject(cvId, project)
    return response.data
  },
)

export const addNewCertificated = createAsyncThunk(
  'cv/addNewCertificated',
  async ({ cvId, certificated }: { cvId: string; certificated: CertificatedModel[] }) => {
    const response = await cvApi.addNewCertificated(cvId, certificated)
    return response.data
  },
)

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
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

    clearCurrentCV(state) {
      state.curCV = {
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
      }
    },
  },
  extraReducers: (builder) => {
    // Get CVs by student Id
    builder.addCase(getCVByStudentId.pending, (state) => {
      state.fetchingCV = true
      state.CVs = []
    })
    builder.addCase(getCVByStudentId.fulfilled, (state, action) => {
      state.fetchingCV = false
      state.CVs = action.payload
    })
    builder.addCase(getCVByStudentId.rejected, (state, action) => {
      state.fetchingCV = false
      state.CVs = []
    })

    // Add new CV
    builder.addCase(addNewCV.pending, (state) => {
      state.fetchingCV = true
    })
    builder.addCase(addNewCV.fulfilled, (state, action) => {
      state.fetchingCV = false
      state.curCV.id = action.payload[0].id
      state.curCV.name = action.payload[0].name
      state.curCV.studentName = action.payload[0].studentName
      state.curCV.position = action.payload[0].position
      state.curCV.content = action.payload[0].content
    })
    builder.addCase(addNewCV.rejected, (state, action) => {
      state.fetchingCV = false
    })

    // Add new skill
    builder.addCase(addNewSkill.fulfilled, (state, action) => {
      state.curCV.details.skills = action.payload
    })

    // Add new contact
    builder.addCase(addNewContact.fulfilled, (state, action) => {
      state.curCV.details.contacts = action.payload
    })

    // Add new project
    builder.addCase(addNewProject.fulfilled, (state, action) => {
      state.curCV.details.project = action.payload
    })

    // Add new certificated
    builder.addCase(addNewCertificated.fulfilled, (state, action) => {
      state.curCV.details.certificated = action.payload
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
  clearCurrentCV,
} = cvSlice.actions

export default cvSlice.reducer
