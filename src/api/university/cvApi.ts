import axios from 'axios'
import { CertificatedModel } from '../../models/certificated.model'
import { ContactModel } from '../../models/contact.model'
import { CVModel } from '../../models/cv.model'
import { ProjectModel } from '../../models/project.model'
import { UNIVERSITY_URL } from '../../utils/Config'
import axiosUniversity from './axiosUniversity'

const cvApi = {
  getCV(studentId: string, limit: number, offset: number) {
    return axiosUniversity.get<string, CVModel[]>(
      `/resume/student?id=${studentId}&limit=${limit}&offset=${offset}`,
    )
  },

  addNewCV(studentId: string, formData: FormData) {
    return axios({
      url: `${UNIVERSITY_URL}/resume?studentId=${studentId}`,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data; boundary=------random-boundary',
      },
      transformRequest: (data, header) => {
        return formData
      },
    })
  },

  updateCV(cvId: string, data: object) {
    return axiosUniversity.patch(`/resume?id=${cvId}`, data)
  },

  addContact(
    cvId: string,
    contact: {
      title: string
      content: string
    }[],
  ) {
    return axios.post(
      `${UNIVERSITY_URL}/contact?cvId=${cvId}`,
      { contact },
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    )
  },

  // updateContact(studentId: string, data: object) {
  //   return axiosUniversity.patch(`/contact?id=${studentId}`, data)
  // },

  addSkill(
    cvId: string,
    skills: {
      name: string
      rating: number
    }[],
  ) {
    return axios.post(
      `${UNIVERSITY_URL}/skill?cvId=${cvId}`,
      { skills },
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    )
  },

  // updateSkill(studentId: string, data: object) {
  //   return axiosUniversity.patch(`/skill?id=${studentId}`, data)
  // },

  addNewProject(cvId: string, project: ProjectModel[]) {
    console.log('cvId', cvId)
    console.log('project', project)
    return axios.post(
      `${UNIVERSITY_URL}/project?cvId=${cvId}`,
      { project },
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    )
  },

  // updateProject(cvId: string, data: object) {
  //   return axiosUniversity.patch(`/project?cvId=${cvId}`, data)
  // },

  addNewCertificated(cvId: string, certificated: CertificatedModel[]) {
    return axios.post(
      `${UNIVERSITY_URL}/certificated?cvId=${cvId}`,
      { certificated },
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    )
  },

  // updateContact(studentId: string, data: object) {
  //   return axiosUniversity.patch(`/certificated?cvId=${studentId}`, data)
  // },
}

export default cvApi
