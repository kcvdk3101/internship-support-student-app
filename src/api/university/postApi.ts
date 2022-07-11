import { PostModel } from '../../models/post.model'
import axiosUniversity from './axiosUniversity'

const postApi = {
  getAllPosts(adminId: number, offset: number) {
    return axiosUniversity.get<string, { data: PostModel[]; pagination: { total: number } }>(
      `/post/all?limit=6&offset=${offset}&authorId=${adminId}`,
    )
  },
}

export default postApi
