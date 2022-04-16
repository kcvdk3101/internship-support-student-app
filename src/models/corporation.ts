export interface Corporation {
  id: string
  name: string
  hotline: string
  email: string
  presenterId?: string
  overtimeRequire: string
  special: string
  startWorkTime: Date | string
  endWorkTime: Date | string
  origin: string
  numberEmployees: number
  slug: string
  isActive: boolean
  isRegistered: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}
