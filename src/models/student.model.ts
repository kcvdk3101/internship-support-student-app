import { Common } from './common'

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
  slug?: string
}
