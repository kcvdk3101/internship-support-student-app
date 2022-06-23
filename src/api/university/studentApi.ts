import axios from 'axios'
import { StudentModel } from '../../models/student.model'
import { TeacherModel } from '../../models/teacher.model'
import { UNIVERSITY_URL } from '../../utils/Config'
import axiosUniversity from './axiosUniversity'

const studentApi = {
  registerTeacher(data: { studentId: string; teacherId: string }[]) {
    return axios.post(`${UNIVERSITY_URL}/university/student/register-teacher`, {
      teacher: data,
    })
  },

  getAllTeacher() {
    return axiosUniversity.get<string, { data: TeacherModel[] }>('/university/teacher/all')
  },

  getTeacherById(teacherId: string) {
    return axiosUniversity.get<string, { teacher: TeacherModel[]; student: StudentModel[] }>(
      `/university/teacher?id=${teacherId}`,
    )
  },
}

export default studentApi
