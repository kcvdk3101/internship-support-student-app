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
