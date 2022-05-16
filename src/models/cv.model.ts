import { ContactModel } from './contact.model'
import { StudentModel } from './student.model'
import { Common } from './common'
import { SkillModel } from './skill.model'
import { CertificatedModel } from './certificated.model'
import { ProjectModel } from './project.model'

export interface CVModel extends Common {
  id?: string
  studentName: string
  position: string
  content: string
  slug?: string
  images?: string[]
  details: {
    student: StudentModel[]
    contacts: ContactModel[]
    skills: SkillModel[]
    certificated: CertificatedModel[]
    project: ProjectModel[]
  }
}
