import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { jobData } from '../../../db/JobData'
import JobCard from '../../../components/cards/JobCard'

type CompanyJobListProps = {}

const CompanyJobList: React.FC<CompanyJobListProps> = () => {
  return (
    <View style={styles.container}>
      {jobData.map((job, index) => (
        <JobCard
          key={index}
          title={job.title}
          location={job.location}
          salary={job.salary}
          timestamp={job.timestamp}
        />
      ))}
    </View>
  )
}

export default CompanyJobList

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
})
