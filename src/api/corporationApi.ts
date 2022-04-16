import axios from 'axios'
import { Corporation } from '../models/corporation'
import axiosClient from './axiosClient'

const url = '/corporation'

const corporationApi = {
  getCorporations(limit: number, offset: number) {
    return axiosClient.get<string, { data: Corporation[]; pagination: { total: number } }>(
      `${url}/all?limit=${limit}&offset=${offset}`,
    )
  },
  getCorporationsByLimit(limit: number) {
    // return axiosClient.get<string, any>(`${url}/all?limit=5&offset=0`)
    return axios.get('http://localhost:3000/corporation/all?limit=5&offset=0')
  },

  getCorporationById(id: number) {
    return axiosClient.get<string, number>(`${url}?id=${id}`)
  },
}

export default corporationApi
