import { Common } from './common'

export interface SkillModel extends Common {
  id: string
  name: string
  rating: number
  slug: string
}
