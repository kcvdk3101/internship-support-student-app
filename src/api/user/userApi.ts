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
}

export default userApi
