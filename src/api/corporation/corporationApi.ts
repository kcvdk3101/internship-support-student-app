import { boolean, string } from 'yup'
import { CorporationModel } from '../../models/corporation.model'
import axiosCorporation from './axiosCorporation'

const url = '/corporation'

const corporationApi = {
  getCorporations({ limit, offset }: { limit: number; offset: number }) {
    return axiosCorporation.get<
      string,
      { data: CorporationModel[]; pagination: { total: number } }
    >(`${url}/all?limit=${limit}&offset=${offset}`)
  },

  getCorporationsByLimit(limit: number) {
    return axiosCorporation.get<
      string,
      { data: CorporationModel[]; pagination: { total: number } }
    >(`${url}/all?limit=${limit}&offset=0`)
  },

  getCorporationByPresentId(presentId: number) {
    return axiosCorporation.get<string, CorporationModel>(`${url}/presenter?id=${presentId}`)
  },

  getCorporationById(id: string) {
    return axiosCorporation.get<string, { corporation: CorporationModel[] }>(`${url}?id=${id}`)
  },

  getCorporationByName(name: string) {
    return axiosCorporation.get<string, { corporation: CorporationModel[] }>(
      `${url}/filter?name=${name}`,
    )
  },

  applyCV(corpId: string, candidates: { studentId: string; cvId: string; jobId: string }[]) {
    return axiosCorporation.post<
      string,
      {
        candidate: {
          cvId: string
          id: string
          isApproved: boolean
          jobId: string
          studentId: string
        }[]
        message: string
      }
    >(`/employee?corporationId=${corpId}`, { candidates })
  },
}

export default corporationApi
