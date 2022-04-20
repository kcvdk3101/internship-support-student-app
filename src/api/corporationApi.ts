import axios from 'axios'
import { API_CORPORATION_URL } from '../constant'
import { Corporation } from '../models/corporation'

const url = '/corporation'

const corporationApi = {
  getCorporations({ limit, offset }: { limit: number; offset: number }) {
    return axios.get<string, Corporation[]>(
      `${API_CORPORATION_URL}/corporation/all?limit=${limit}&offset=${offset}`,
    )
  },

  getCorporationsByLimit(limit: number) {
    return axios.get<string, any>(`${API_CORPORATION_URL}/corporation/all?limit=${limit}&offset=0`)
  },

  getCorporationByPresentId(presentId: number) {
    return axios.get(`${API_CORPORATION_URL}/corporation/presenter?id=${presentId}`)
  },

  getCorporationById(id: number) {
    return axios.get(`${API_CORPORATION_URL}/corporation?id=${id}`)
  },
}

export default corporationApi
