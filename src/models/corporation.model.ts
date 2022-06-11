import { Location } from './location.model'
import { Review } from './review.model'

export interface CorporationModel {
  id: string
  name: string
  hotline: string
  email: string
  presenterId: string
  overtimeRequire: string
  special: string
  startWorkTime: string
  endWorkTime: string
  origin: string
  numberEmployees: number
  slug: string
  isActive: boolean
  isRegistered: boolean
  createdAt: string
  updatedAt: string
  image: any[]
  location: Location[]
  review: Review[]
}
