import { JobModel } from '../../models/job.model'
import axiosCorporation from './axiosCorporation'

const url = '/job'

const jobApi = {
  getAllJobInCorporation(id: string) {
    return axiosCorporation.get<string, { data: JobModel[]; pagination: { total: number } }>(
      `${url}/all/corporation?id=${id}&limit=10&offset=0`,
    )
  },
  getJobById(id: string) {
    return axiosCorporation.get<string, JobModel>(`${url}/job?id=${id}`)
  },
}

export default jobApi
