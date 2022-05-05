import axios from 'axios'
import { API_CV_URL } from '../constant'
import { Project } from '../models/project'

const cvApi = {
  getCV(studentId: string, limit: number, offset: number) {
    return axios.get(`${API_CV_URL}/resume/student?id=${studentId}&limit=${limit}&offset=${offset}`)
  },

  addNewCV(studentId: string, data: FormData) {
    return axios.post(`${API_CV_URL}/resume?studentId=${studentId}`, data)
  },

  updateCV(cvId: string, data: object) {
    return axios.patch(`${API_CV_URL}/resume?id=${cvId}`, data)
  },

  addSkill(cvId: string, skills: object[]) {
    return axios.post(`${API_CV_URL}/skill?cvId=${cvId}`, { skills })
  },

  // updateSkill(studentId: string, data: object) {
  //   return axios.patch(`${API_CV_URL}/skill?id=${studentId}`, data)
  // },

  addContact(cvId: string, contacts: { title: string; content: string }[]) {
    return axios.post(`${API_CV_URL}/contact?cvId=${cvId}`, { contacts })
  },

  // updateContact(studentId: string, data: object) {
  //   return axios.patch(`${API_CV_URL}/contact?id=${studentId}`, data)
  // },

  addCertificated(
    cvId: string,
    certificated: { name: string; issueDate: string; organizer: string },
  ) {
    return axios.post(`${API_CV_URL}/certificated?cvId=${cvId}`, { certificated })
  },

  // updateContact(studentId: string, data: object) {
  //   return axios.patch(`${API_CV_URL}/certificated?cvId=${studentId}`, data)
  // },

  addProject(cvId: string, project: Project[]) {
    return axios.post(`${API_CV_URL}/contact?cvId=${cvId}`, { project })
  },

  updateProject(cvId: string, data: object) {
    return axios.patch(`${API_CV_URL}/project?cvId=${cvId}`, data)
  },
}

export default cvApi
