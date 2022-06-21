import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { UNIVERSITY_URL } from '../../utils/Config'

const axiosUniversity = axios.create({
  baseURL: UNIVERSITY_URL,
  headers: {
    Accept: 'application/json;charset=utf-8',
    'Content-Type': 'multipart/form-data',
  },
})

// Add a request interceptor
axiosUniversity.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

// Add a response interceptor
axiosUniversity.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default axiosUniversity
