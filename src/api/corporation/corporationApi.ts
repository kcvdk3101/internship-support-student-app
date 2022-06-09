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
    return axiosCorporation.get<string, { data: CorporationModel[] }>(
      `${url}/all?limit=${limit}&offset=0`,
    )
  },

  getCorporationByPresentId(presentId: number) {
    return axiosCorporation.get<string, CorporationModel>(`${url}/presenter?id=${presentId}`)
  },

  getCorporationById(id: string) {
    return axiosCorporation.get<string, { corporation: CorporationModel[] }>(`${url}?id=${id}`)
  },
}

export default corporationApi
