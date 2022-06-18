import { CorporationModel } from '../../models/corporation.model'
import { JobModel } from '../../models/job.model'
import { Location } from '../../models/location.model'
import { Salary } from '../../models/salary.model'
import { Skill } from '../../models/skill.model'
import axiosCorporation from './axiosCorporation'

const url = '/job'
const search = '/search'

const jobApi = {
  getAllJobsInCorporation(id: string) {
    return axiosCorporation.get<string, { data: JobModel[]; pagination: { total: number } }>(
      `${url}/all/corporation?id=${id}&limit=10&offset=0`,
    )
  },

  getJobById(id: string) {
    return axiosCorporation.get<
      string,
      {
        job: JobModel[]
        corporation: CorporationModel[]
        skill: Skill[]
        location: Location[]
        salary: Salary[]
      }
    >(`${url}?id=${id}`)
  },

  getAllJobsBySkill(name: string, limit: number, offset: number) {
    return axiosCorporation.get<string, {}>(
      `${search}/skill?name=${name}&limit=${limit}&offset=${offset}`,
    )
  },

  getAllJobsByTitle(name: string, limit: number, offset: number) {
    return axiosCorporation.get<string, {}>(
      `${search}/title?name=${name}&limit=${limit}&offset=${offset}`,
    )
  },

  getAllJobsByCity(name: string, limit: number, offset: number) {
    return axiosCorporation.get<string, { data: JobModel[]; pagination: { total: number } }>(
      `${search}/city?name=${name}&limit=${limit}&offset=${offset}`,
    )
  },
}

export default jobApi
