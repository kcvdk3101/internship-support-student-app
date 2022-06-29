import { StudentModel } from '../../models/student.model'
import { TeacherModel } from '../../models/teacher.model'
import axiosUniversity from './axiosUniversity'

const teacherApi = {
  getTeacherById(teacherId: string) {
    return axiosUniversity.get<string, { teacher: TeacherModel[]; student: StudentModel[] }>(
      `/university/teacher?id=${teacherId}`,
    )
  },
}

export default teacherApi
