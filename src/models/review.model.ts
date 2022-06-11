import { Common } from './common'

export interface SubReview extends Common {
  id: string
  content: string
  rating: number
}

export interface Review extends Common {
  id: string
  title: string
  comment: string
  isRecommendable?: string
  rating?: number
  subreview: SubReview[]
}
