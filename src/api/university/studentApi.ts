import { StudentModel } from '../../models/student.model'
import { TeacherModel } from '../../models/teacher.model'
import axiosUniversity from './axiosUniversity'

const studentApi = {
  registerTeacher(teacher: { studentId: string; teacherId: string }[]) {
    return axiosUniversity.post<
      string,
      [
        {
          register: { id: string; studentId: string; teacherId: string; isActive: boolean }
          message: string
        },
      ]
    >('/university/student/register-teacher', { teacher })
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
