export interface Technology {
  name: string
}

export interface Project {
  name: string
  startDate: Date | string
  endDate: Date | string
  description: string
  teamSize: number
  role: string
  responsibilities: string
  sourceLink: string
  technologies: Technology[]
}

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
