import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { jobData } from '../../../db/JobData'
import JobCard from '../../../components/cards/JobCard'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { getAllJobInCorporation } from '../../../features/jobSlice'

type CompanyJobListProps = {
  companyId: string
}

const CompanyJobList: React.FC<CompanyJobListProps> = ({ companyId }) => {
  console.log(companyId)
  const dispatch = useAppDispatch()
  const jobsInCorp = useAppSelector((state) => state.job.jobsInCorp)

  useEffect(() => {
    ;(async () => {
      await dispatch(getAllJobInCorporation(companyId))
    })()
  }, [companyId])

  return (
    <View style={styles.container}>
      {jobsInCorp &&
        jobsInCorp.length > 0 &&
        jobsInCorp.map((job, index) => {
          const { location, salary, corporation } = job.details
          const { details, street, district, ward } = location[0]
          const locationDetail = `${details}, ${street} Street, Ward ${ward}, District ${district}`

          return (
            <JobCard
              key={index}
              title={job.title}
              location={locationDetail}
              salary={`${salary[0].gt} - ${salary[0].lt}`}
              timestamp={`${corporation[0].overtimeRequire}`}
            />
          )
        })}
    </View>
  )
}

export default CompanyJobList

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
})
