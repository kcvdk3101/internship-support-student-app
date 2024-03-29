import { Common } from './common'
import { CVModel } from './cv.model'
import { TeacherModel } from './teacher.model'

export interface StudentModel extends Common {
  id?: string
  firstName: string
  lastName: string
  fullName: string
  email?: string
  birthDate: string
  identityNumber: string
  address: string
  phoneNumber: string
  class: string
  term?: string
  status: string
  academicYear?: string
  nameTeacher?: string
  slug?: string
  internshipCertification?: boolean
  internshipReport?: boolean
  internshipFeedback?: boolean
  internshipSurvey?: boolean
  internshipFirstGrade?: number
  internshipSecondGrade?: number
  internshipThirdGrade?: number
  internshipFinalGrade?: number
  cv?: CVModel[]
  teacher?: TeacherModel[]
  detail?: [
    {
      studentId: string
      teacherId: string
      isRegistered: string
      isAccepted: string
    },
  ]
}
