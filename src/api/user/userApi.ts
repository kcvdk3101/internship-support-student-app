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
  resetPasswordCode(email: string) {
    return axiosUser.post<string, { resetPasswordCode: number; message: string; result: boolean }>(
      `${url}/resetPasswordCode`,
      { email },
    )
  },
  checkValidResetPasswordCode(email: string, resetPasswordCode: number) {
    return axiosUser.post<string, { isValid: boolean }>(`${url}/checkResetPasswordCode`, {
      email,
      resetPasswordCode,
    })
  },
  resetPassword(email: string, password: string) {
    return axiosUser.patch<string, { message: string }>(`${url}/resetPassword`, {
      email,
      password,
    })
  },
}

export default userApi
