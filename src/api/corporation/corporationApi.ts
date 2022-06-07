import axios from 'axios'
import { CORPORATION_URL } from '../../utils/Config'
import { CorporationModel } from '../../models/corporation.model'
import axiosCorporation from './axiosCorporation'

const url = '/corporation'

const corporationApi = {
  getCorporations({ limit, offset }: { limit: number; offset: number }) {
    return axiosCorporation.get<string, CorporationModel[]>(
      `${url}/all?limit=${limit}&offset=${offset}`,
    )
  },

  getCorporationsByLimit(limit: number) {
    return axiosCorporation.get<string, any>(`${url}/all?limit=${limit}&offset=0`)
  },

  getCorporationByPresentId(presentId: number) {
    return axiosCorporation.get<string, CorporationModel>(`${url}/presenter?id=${presentId}`)
  },

  getCorporationById(id: number) {
    return axiosCorporation.get<string, CorporationModel>(`${url}?id=${id}`)
  },
}

export default corporationApi
