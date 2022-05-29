import axios from 'axios'
import { CORPORATION_URL } from '../../utils/Config'
import { CorporationModel } from '../../models/corporation.model'

const url = '/corporation'

const corporationApi = {
  getCorporations({ limit, offset }: { limit: number; offset: number }) {
    return axios.get<string, CorporationModel[]>(
      `${CORPORATION_URL}/corporation/all?limit=${limit}&offset=${offset}`,
    )
  },

  getCorporationsByLimit(limit: number) {
    return axios.get<string, any>(`${CORPORATION_URL}/corporation/all?limit=${limit}&offset=0`)
  },

  getCorporationByPresentId(presentId: number) {
    return axios.get(`${CORPORATION_URL}/corporation/presenter?id=${presentId}`)
  },

  getCorporationById(id: number) {
    return axios.get(`${CORPORATION_URL}/corporation?id=${id}`)
  },
}

export default corporationApi
