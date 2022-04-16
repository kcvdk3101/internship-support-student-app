import { Project } from './project'
export interface Certificate {
  name: string
  organizer: string
  issuedIn: Date | string
}

export interface CV {
  name: string
  position: string
  email: string
  phone: string
  skills: string[]
  languages: string[]
  projects: Project[]
  certificates: Certificate[]
}
