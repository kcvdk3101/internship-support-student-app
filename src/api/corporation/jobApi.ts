import { JobModel } from '../../models/job.model'
import axiosCorporation from './axiosCorporation'

const url = '/job'

const jobApi = {
  getAllJobInCorporation(id: string) {
    return axiosCorporation.get<string, { data: JobModel[]; pagination: { total: number } }>(
      `${url}/all/corporation?id=${id}&limit=1&offset=0`,
    )
  },
}

export default jobApi
