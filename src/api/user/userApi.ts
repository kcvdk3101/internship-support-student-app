import axios from 'axios'
import { UserModel } from '../../models/user.model'
import axiosUser from './axiosUser'

const url = '/auth'

const userApi = {
  login(email: string, password: string) {
    return axiosUser.post<string, { user: UserModel }>(`${url}/login`, { email, password })
  },
  logout() {
    return axiosUser.post<string, string>(`${url}/logout`)
  },
  changePassword(userId: string, data: { currentPassword: string; newPassword: string }) {
    return axiosUser.patch<string, { message: string; status: number; result: boolean }>(
      `${url}/${userId}/password`,
      data,
    )
  },
  resetPassword(email: string) {
    return axiosUser.post<string, { password: string; message: string; result: boolean }>(
      `${url}/resetPassword`,
      { email },
    )
  },
}

export default userApi
