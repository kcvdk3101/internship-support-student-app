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
    // return fetch(`${UNIVERSITY_URL}/resume?studentId=${studentId}`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'multipart/form-data; boundary=------random-boundary',
    //   },
    //   body: data,

    // })
  },

  updateCV(cvId: string, data: object) {
    return axiosUniversity.patch(`/resume?id=${cvId}`, data)
  },

  addContact(cvId: string, contacts: ContactModel[]) {
    return axiosUniversity.post(`/contact?cvId=${cvId}`, { contacts })
  },

  updateContact(studentId: string, data: object) {
    return axiosUniversity.patch(`/contact?id=${studentId}`, data)
  },

  addSkill(
    cvId: string,
    skills: {
      name: string
      rating: number
    }[],
  ) {
    return axiosUniversity.post(`/skill?cvId=${cvId}`, { skills })
  },

  updateSkill(studentId: string, data: object) {
    return axiosUniversity.patch(`/skill?id=${studentId}`, data)
  },

  addNewProject(cvId: string, project: ProjectModel[]) {
    return axiosUniversity.post(`/project?cvId=${cvId}`, { project })
  },

  updateProject(cvId: string, data: object) {
    return axiosUniversity.patch(`/project?cvId=${cvId}`, data)
  },

  addNewCertificated(cvId: string, certificated: CertificatedModel[]) {
    return axiosUniversity.post(`/certificated?cvId=${cvId}`, { certificated })
  },

  // updateContact(studentId: string, data: object) {
  //   return axiosUniversity.patch(`/certificated?cvId=${studentId}`, data)
  // },
}

export default cvApi
