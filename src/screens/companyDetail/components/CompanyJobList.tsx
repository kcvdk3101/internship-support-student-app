import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import JobCard from '../../../components/cards/JobCard'
import { getAllJobsInCorporation } from '../../../features/jobSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

type CompanyJobListProps = {
  navigation: NavigationProp<ParamListBase>
  companyId: string
}

const CompanyJobList: React.FC<CompanyJobListProps> = ({ companyId, navigation }) => {
  const dispatch = useAppDispatch()
  const jobsInCorp = useAppSelector((state) => state.job.jobsInCorp)

  useEffect(() => {
    ;(async () => {
      await dispatch(getAllJobsInCorporation(companyId))
    })()
  }, [companyId])

  return (
    <View style={styles.container}>
      {jobsInCorp &&
        jobsInCorp.length > 0 &&
        jobsInCorp.map((job, index) => {
          const { location, salary, corporation } = job.details
          const { details, street, district, ward } = location[0]
          const locationDetail = `${details}, ${street} Street, District ${district}`

          return (
            <JobCard
              key={index}
              jobId={job.id}
              title={job.title}
              location={locationDetail}
              salary={`${salary[0].gt} - ${salary[0].lt}`}
              timestamp={`${corporation[0].overtimeRequire}`}
              navigation={navigation}
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
