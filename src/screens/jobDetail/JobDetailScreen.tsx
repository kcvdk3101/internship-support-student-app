import { StyleSheet, Text, View, SafeAreaView, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useAppDispatch } from '../../hooks/redux'
import { getJobById } from '../../features/jobSlice'
import { JobModel } from '../../models/job.model'
import { CorporationModel } from '../../models/corporation.model'
import { Skill } from '../../models/skill.model'
import { Salary } from '../../models/salary.model'
import { Location } from '../../models/location.model'
import Theme from '../../utils/Theme'
import { ScrollView } from 'react-native-gesture-handler'
import ChipButton from '../../components/buttons/ChipButton'
import { Ionicons } from '@expo/vector-icons'
import { Utils } from '../../utils/Utils'
import ButtonGroup from '../companyDetail/components/ButtonGroup'

type JobDetailScreenProps = {
  navigation: NavigationProp<ParamListBase>
  route: any
}

type Response = {
  job: JobModel[]
  corporation: CorporationModel[]
  skill: Skill[]
  location: Location[]
  salary: Salary[]
}

const JobDetailScreen: React.FC<JobDetailScreenProps> = ({ navigation, route }) => {
  const { jobId } = route.params
  const dispatch = useAppDispatch()

  const [jobById, setJobById] = useState<Response>()
  const [index, setIndex] = useState(0)

  const locationDetail = `${jobById?.location[0].details}, ${jobById?.location[0].street} Street, District ${jobById?.location[0].district}`

  useEffect(() => {
    ;(async () => {
      try {
        const response = await dispatch(getJobById(jobId))
        if (response.meta.requestStatus === 'fulfilled') {
          setJobById(response.payload as Response)
        }
      } catch (error) {
        Alert.alert('Something wrong!')
      }
    })()
  }, [jobId])

  const handleChangeIndex = (num: number) => {
    setIndex(num)
  }

  const linkToGoogleMap = (destination: string) => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${destination}`)
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.job}>
          <Text style={styles.jobTitle}>{jobById?.job[0].title}</Text>
          <Text style={styles.companyName}>{jobById?.corporation[0].name}</Text>
          <View style={styles.skillGroup}>
            {jobById?.skill.map((s, idx) => (
              <ChipButton
                key={idx}
                name={s.name}
                bgColor={Theme.palette.paragraph.primary}
                txtColor={Theme.palette.white.primary}
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="timer-outline" size={24} color={Theme.palette.paragraph.primary} />
            <Text>{Utils.convertDateString(jobById?.job[0].dateCreated)}</Text>
          </View>
        </View>
        <View style={{ marginVertical: 16 }}>
          <ButtonGroup
            index={index}
            titleTab1="Job Details"
            titleTab2="Company"
            handleChangeIndex={handleChangeIndex}
          />
          {index === 0 ? (
            <View>
              <Text>
                {jobById?.salary[0].gt} {jobById?.salary[0].lt}
              </Text>
              <Text
                style={{
                  color: Theme.palette.main.primary,
                }}
                onPress={() => linkToGoogleMap(locationDetail)}
              >
                {locationDetail}
              </Text>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default JobDetailScreen

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  job: {
    ...Theme.shadow.depth1,
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 8,
  },
  jobTitle: {
    textAlign: 'center',
    ...Theme.fonts.headline.h5,
    marginVertical: 4,
  },
  companyName: {
    textAlign: 'center',
    ...Theme.fonts.headline.h6,
    marginVertical: 8,
    color: Theme.palette.main.primary,
  },
  skillGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
})
