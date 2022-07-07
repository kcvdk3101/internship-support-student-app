import { StudentModel } from '../../models/student.model'
import { TeacherModel } from '../../models/teacher.model'
import axiosUniversity from './axiosUniversity'

const url = '/university'

const studentApi = {
  registerTeacher(teacher: { studentId: string; teacherId: string }[]) {
    return axiosUniversity.post<string, any>(`${url}/student/register-teacher`, {
      teacher,
    })
  },

  getAllTeacher(academicYear: number) {
    return axiosUniversity.get<string, { data: TeacherModel[] }>(
      `${url}/teacher/all?academicYear=${academicYear}`,
    )
  },

  getTeacherById(teacherId: string) {
    return axiosUniversity.get<string, { teacher: TeacherModel[]; student: StudentModel[] }>(
      `${url}/teacher?id=${teacherId}`,
    )
  },
}

export default studentApi
