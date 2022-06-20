import axiosUniversity from './axiosUniversity'

const studentApi = {
  registerTeacher(teacher: []) {
    return axiosUniversity.post<string, any>('/university/student/register-teacher', { teacher })
  },
}

export default studentApi
