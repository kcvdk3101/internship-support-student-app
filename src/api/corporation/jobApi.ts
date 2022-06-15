import { JobModel } from '../../models/job.model'
import axiosCorporation from './axiosCorporation'

const url = '/job'

const jobApi = {
  getAllJobsInCorporation(id: string) {
    return axiosCorporation.get<string, { data: JobModel[]; pagination: { total: number } }>(
      `${url}/all/corporation?id=${id}&limit=10&offset=0`,
    )
  },
  getJobById(id: string) {
    return axiosCorporation.get<string, JobModel>(`${url}/job?id=${id}`)
  },

  getAllJobsBySkill(id: string, name: string, limit: number, offset: number) {
    return axiosCorporation.get<string, {}>(
      `/search/skill?name=${name}&limit=${limit}&offset=${offset}`,
    )
  },
}

export default jobApi
