import { Review } from '../../models/review.model'
import axiosCorporation from './axiosCorporation'

const reviewApi = {
  addNewReview(corporationId: string, review: Review[]) {
    return axiosCorporation.post(`/review?corporationId=${corporationId}`, { review })
  },
}

export default reviewApi
