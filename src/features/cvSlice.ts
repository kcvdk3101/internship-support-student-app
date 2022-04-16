import { createSlice } from '@reduxjs/toolkit'
import { CV } from '../models/cv'

type CVSliceStateProps = {
  cv: CV
}

const initialState: CVSliceStateProps = {
  cv: {
    name: '',
    position: '',
    email: '',
    phone: '',
    skills: [],
    languages: [],
    projects: [],
    certificates: [],
  },
}

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    addListSkill: (state, action) => {
      state.cv.skills = action.payload
    },
    addListLanguage: (state, action) => {
      state.cv.languages = action.payload
    },
    addProjects: (state, action) => {
      state.cv.projects.push(action.payload)
    },
    addCertificates: (state, action) => {
      state.cv.certificates.push(action.payload)
    },
  },
  extraReducers: {},
})

export const { addListSkill, addListLanguage, addProjects, addCertificates } = cvSlice.actions

export default cvSlice.reducer
