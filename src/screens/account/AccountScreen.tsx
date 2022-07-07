import { Ionicons } from '@expo/vector-icons'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native'
import studentApi from '../../api/university/studentApi'
import teacherApi from '../../api/university/teacherApi'
import GeneralButton from '../../components/buttons/GeneralButton'
import CVCard from '../../components/cards/CVCard'
import { login } from '../../features/authenticationSlice'
import { getCVByStudentId } from '../../features/cvSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { StudentModel } from '../../models/student.model'
import { TeacherModel } from '../../models/teacher.model'
import Theme from '../../utils/Theme'
import { Utils } from '../../utils/Utils'
import SkeletonComponentScreen from '../company/components/SkeletonComponentScreen'
import ChangePasswordButton from './changePassword/ChangePasswordButton'
import ChangePasswordScreen from './changePassword/ChangePasswordScreen'
import LogOutButton from './components/LogOutButton'
import StudentInformation from './components/StudentInformation'
import TeacherInformation from './components/TeacherInformation'
import RegisterTeacherScreen from './registerTeacher/RegisterTeacherScreen'

type AccountScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const {
    isAuthenticated,
    user: { studentId, id, student },
  } = useAppSelector((state) => state.auth)
  const user = useAppSelector((state) => state.auth.user)
  const CVs = useAppSelector((state) => state.cv.CVs)

  const [loading, setLoading] = useState<boolean>(false)
  const [loadingCVs, setLoadingCVs] = useState(false)

  const [actions, setActions] = useState({
    openForm: false,
    openRegisterForm: false,
    openReportForm: false,
    openSendEmailTeacher: false,
  })

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
          Alert.alert('Cannot load your CV')
        } finally {
          setLoadingCVs(false)
        }
      }
    })()
  }, [isAuthenticated])

  const onRefresh = useCallback(async () => {
    try {
      let email = await AsyncStorageLib.getItem('@email')
      let password = await AsyncStorageLib.getItem('@password')
      if (email && password) {
        await dispatch(login({ email, password }))
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  // useEffect(() => {
  //   ;(async () => {
  //     setLoadingTeacher(true)
  //     try {
  //       let teacherId = await AsyncStorageLib.getItem('@teacherId')
  //       if (teacherId === null) return

  //       const response = await teacherApi.getTeacherById(teacherId)
  //       if (response.teacher.length > 0) {
  //         setTeacher(response.teacher[0])
  //         setLoadingTeacher(false)
  //       }
  //     } catch (error) {
  //       Alert.alert('Cannot load teacher information')
  //     } finally {
  //       setLoadingTeacher(false)
  //     }
  //   })()
  // }, [actions.openRegisterForm])

  useEffect(() => {
    if ((typeof id !== 'string' && id === undefined) || '' || null) {
      navigation.navigate('HomeTab')
    }
  }, [id])

  const handleActionOpenForm = (
    action: 'openForm' | 'openRegisterForm' | 'openReportForm' | 'openSendEmailTeacher',
  ) => {
    setActions({ ...actions, [action]: true })
  }

  const handleActionCloseForm = (
    action: 'openForm' | 'openRegisterForm' | 'openReportForm' | 'openSendEmailTeacher',
  ) => {
    setActions({ ...actions, [action]: false })
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <SkeletonComponentScreen />
      ) : (
        <ScrollView
          nestedScrollEnabled={true}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        >
          <View style={styles.headingContainer}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={28} style={styles.icon} />
            </Pressable>
          </View>

          <StudentInformation student={student as StudentModel} />

          <TeacherInformation
            teacher={student?.teacher as TeacherModel[]}
            loading={loading}
            handleActionOpenForm={handleActionOpenForm}
          />

          <View style={styles.cvContainer}>
            <Text style={styles.cvHeading}>{t('CV')}</Text>

            {/* CV List */}
            <ScrollView scrollEnabled style={{ height: CVs.length > 0 ? 400 : 'auto' }}>
              {loadingCVs ? (
                <View style={{ marginTop: 8, marginBottom: 16 }}>
                  <ActivityIndicator size="large" color={Theme.palette.background.modal} />
                </View>
              ) : (
                <>
                  {CVs && CVs.length > 0 ? (
                    <View>
                      {CVs.map((cv, index) => (
                        <CVCard
                          key={index}
                          name={cv.name}
                          position={`Position: ${cv.position}`}
                          createdAt={`Created at : ${Utils.convertDateString(cv.createdAt)}`}
                        />
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.notFound}>{t("You don't have any CVs yet")}</Text>
                  )}
                </>
              )}
            </ScrollView>

            {/* Button Upload */}
            <GeneralButton
              bgColor={Theme.palette.main.third}
              isAlignCenter={true}
              label={t('Create New CV')}
              txtColor={Theme.palette.white.primary}
              isLoading={false}
            />
          </View>

          {/* Report Button */}
          {/* <ReportButton handleOpenForm={handleActionOpenForm} /> */}

          {/* Change password Button */}
          <ChangePasswordButton handleOpenForm={handleActionOpenForm} />

          {/* Logout Button */}
          <LogOutButton navigation={navigation} />
          {actions.openForm && <ChangePasswordScreen handleCloseForm={handleActionCloseForm} />}

          {actions.openRegisterForm && (
            <RegisterTeacherScreen
              handleOpenForm={handleActionOpenForm}
              handleCloseForm={handleActionCloseForm}
            />
          )}

          {actions.openSendEmailTeacher && (
            <RegisterTeacherScreen
              handleOpenForm={handleActionOpenForm}
              handleCloseForm={handleActionCloseForm}
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.main.third,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  icon: {
    ...Theme.fonts.headline.h4,
    color: Theme.palette.white.primary,
  },
  heading: {
    ...Theme.fonts.headline.h4,
    color: Theme.palette.white.primary,
  },
  cvContainer: {
    marginTop: 30,
    backgroundColor: Theme.palette.white.primary,
    padding: 15,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  cvHeading: {
    ...Theme.fonts.headline.h6,
    color: Theme.palette.main.fourth,
    marginBottom: 10,
  },
  notFound: { ...Theme.fonts.body.body1, marginBottom: 16 },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    marginTop: 20,
    ...Theme.fonts.headline.h4,
    ...Theme.shadow.depth2,
    color: Theme.palette.white.primary,
  },
  avatarContainer: {
    position: 'relative',
    ...Theme.shadow.depth3,
  },
  avatar: {
    width: 165,
    height: 165,
    borderRadius: 100,
  },
  btnEdit: {
    zIndex: 2,
    position: 'absolute',
    bottom: -10,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: 10,
    backgroundColor: Theme.palette.main.third,
  },
  btnEditImage: {
    width: 24,
    height: 24,
    tintColor: Theme.palette.white.primary,
  },
})
