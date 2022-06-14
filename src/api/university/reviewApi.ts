import { Review } from '../../models/review.model'
import axiosUniversity from './axiosUniversity'

const reviewApi = {
  addNewReview(corporationId: string, review: Review[]) {
    return axiosUniversity.post(`/review?corporationId=${corporationId}`, { review })
  },
}

export default reviewApi
