import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import jobApi from '../../api/corporation/jobApi'
import ChipButton from '../../components/buttons/ChipButton'
import GeneralButton from '../../components/buttons/GeneralButton'
import { getCVByStudentId } from '../../features/cvSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CorporationModel } from '../../models/corporation.model'
import { JobModel } from '../../models/job.model'
import { Location } from '../../models/location.model'
import { Salary } from '../../models/salary.model'
import { Skill } from '../../models/skill.model'
import Theme from '../../utils/Theme'
import { Utils } from '../../utils/Utils'
import AuthenticationScreen from '../authentication/AuthenticationScreen'
import ListCV from './components/ListCV'

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
  const {
    isAuthenticated,
    user: { studentId },
  } = useAppSelector((state) => state.auth)

  const [jobById, setJobById] = useState<Response>()
  const [loadingCVs, setLoadingCVs] = useState(false)

  const [loading, setLoading] = useState(false)
  const [openCVs, setOpenCVs] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const locationDetail = `${jobById?.location[0].details}, ${jobById?.location[0].street} Street, District ${jobById?.location[0].district}`

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const response = await jobApi.getJobById(jobId)
        setJobById(response)
        setLoading(false)
      } catch (error) {
        Alert.alert('Something wrong!')
      } finally {
        setLoading(false)
      }
    })()
  }, [isAuthenticated, jobId])

  useEffect(() => {
    ;(async () => {
      if (studentId !== '') {
        setLoadingCVs(true)
        try {
          const response = await dispatch(getCVByStudentId({ studentId, limit: 10, offset: 0 }))
          if (response.meta.requestStatus === 'fulfilled') {
            setLoadingCVs(false)
          }
        } catch (error) {
          Alert.alert('Something wrong!')
        } finally {
          setLoadingCVs(false)
        }
      }
    })()
  }, [openCVs])

  const linkToGoogleMap = (destination: string) => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${destination}`)
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleCloseCVs = () => {
    setOpenCVs(false)
  }

  const handleOpenCVs = () => {
    if (!isAuthenticated) {
      return Alert.alert('Notice', 'Please login first to get CV', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Go to Login',
          onPress: handleOpenModal,
        },
      ])
    } else {
      setOpenCVs(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{ marginVertical: 16 }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            <View style={styles.job}>
              <Text style={styles.jobTitle}>{jobById?.job[0].title}</Text>
              <Text style={styles.companyName}>{jobById?.corporation[0].name}</Text>
              <View style={styles.skillGroup}>
                {jobById?.skill.map((s, idx) => (
                  <ChipButton
                    key={idx}
                    name={s.name}
                    bgColor={Theme.palette.background.modal}
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
                <Text style={{ marginLeft: 4 }}>
                  Created at: {Utils.convertDateString(jobById?.job[0].dateCreated)}
                </Text>
              </View>
            </View>
            <View style={styles.jobDetailContainer}>
              <View style={styles.jobDetail}>
                <Text style={{ ...Theme.fonts.headline.h6 }}>Information</Text>
                <View style={styles.detail}>
                  <Ionicons
                    name="location"
                    size={20}
                    color={Theme.palette.paragraph.primary}
                    style={styles.icon}
                  />
                  <Text
                    style={[styles.text, { color: '#0194f3', textDecorationLine: 'underline' }]}
                    onPress={() => linkToGoogleMap(locationDetail)}
                  >
                    {locationDetail}
                  </Text>
                </View>
                <View style={styles.detail}>
                  <Ionicons
                    name="cash"
                    size={20}
                    color={Theme.palette.paragraph.primary}
                    style={styles.icon}
                  />
                  <Text style={styles.text}>
                    {jobById?.salary[0].gt} - {jobById?.salary[0].lt} {jobById?.salary[0].unit}
                  </Text>
                </View>
                <View style={styles.detail}>
                  <Ionicons
                    name="people"
                    size={20}
                    color={Theme.palette.paragraph.primary}
                    style={styles.icon}
                  />
                  <Text style={styles.text}>{jobById?.job[0].numberCandidate} candidates</Text>
                </View>
              </View>
              <View style={styles.jobDetail}>
                <Text style={{ ...Theme.fonts.headline.h6 }}>Job Description</Text>
                <Text>{jobById?.job[0].description}</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonApplyContainer}>
            <GeneralButton
              bgColor={Theme.palette.main.third}
              txtColor={Theme.palette.white.primary}
              isAlignCenter={true}
              label="Easy to Apply"
              isLoading={false}
              onPress={handleOpenCVs}
            />
          </View>
          {showModal && (
            <AuthenticationScreen
              handleShowModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              navigation={navigation}
            />
          )}
          {openCVs && (
            <ListCV
              corpId={jobById?.corporation[0].id as string}
              jobId={jobById?.job[0].id as string}
              handleCloseModal={handleCloseCVs}
              loadingCVs={loadingCVs}
            />
          )}
        </>
      )}
    </SafeAreaView>
  )
}

export default JobDetailScreen

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', flex: 1 },
  scrollView: {
    margin: 8,
  },
  job: {
    ...Theme.shadow.depth1,
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 16,
  },
  jobDetailContainer: { marginVertical: 16 },
  jobDetail: { margin: 8 },
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
  icon: {
    marginRight: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  text: {
    ...Theme.fonts.body.body2,
  },
  buttonApplyContainer: { marginHorizontal: 32, marginVertical: 16 },
})
