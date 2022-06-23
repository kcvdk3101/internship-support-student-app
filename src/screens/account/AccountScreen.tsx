import { Ionicons } from '@expo/vector-icons'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import studentApi from '../../api/university/studentApi'
import GeneralButton from '../../components/buttons/GeneralButton'
import CVCard from '../../components/cards/CVCard'
import { getCVByStudentId } from '../../features/cvSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CVModel } from '../../models/cv.model'
import { StudentModel } from '../../models/student.model'
import { TeacherModel } from '../../models/teacher.model'
import Theme from '../../utils/Theme'
import ChangePasswordButton from './changePassword/ChangePasswordButton'
import ChangePasswordScreen from './changePassword/ChangePasswordScreen'
import LogOutButton from './components/LogOutButton'
import StudentInformation from './components/StudentInformation'
import TeacherInformation from './components/TeacherInformation'
import RegisterTeacherScreen from './registerTeacher/RegisterTeacherScreen'
import ReportButton from './report/ReportButton'

type AccountScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)

  const [studentCV, setStudentCV] = useState<CVModel[]>([])
  const [teacher, setTeacher] = useState<TeacherModel>()
  const [actions, setActions] = useState({
    openForm: false,
    openRegisterForm: false,
    openReportForm: false,
  })

  useEffect(() => {
    if ((typeof user.id !== 'string' && user.id === undefined) || '' || null) {
      navigation.navigate('HomeTab')
    }
  }, [user])

  // useEffect(() => {
  //   ;(async () => {
  //     let teacherId = await AsyncStorageLib.getItem('teacherId')
  //     try {
  //       const response = await studentApi.getTeacherById(teacherId as string)
  //       if (response.teacher.length > 0) {
  //         setTeacher(response.teacher[0])
  //       }
  //     } catch (error) {
  //       Alert.alert('Cannot load teacher information')
  //     }
  //   })()
  // }, [navigation, user.student?.nameTeacher])

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const response = await dispatch(
  //         getCVByStudentId({ studentId: user.id, limit: 10, offset: 0 }),
  //       )
  //       if (response.meta.requestStatus === 'fulfilled') {
  //         setStudentCV(response.payload as CVModel[])
  //       }
  //     } catch (error) {
  //       Alert.alert('Cannot load your CV')
  //     }
  //   })()
  //   return () => {
  //     setStudentCV([])
  //   }
  // }, [])

  const handleActionOpenForm = (action: string) => {
    setActions({ ...actions, [action]: true })
  }

  const handleActionCloseForm = (action: string) => {
    setActions({ ...actions, [action]: false })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.headingContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} style={styles.icon} />
          </Pressable>
        </View>

        <StudentInformation student={user.student as StudentModel} />

        <TeacherInformation
          teacher={user.student?.nameTeacher}
          handleActionOpenForm={handleActionOpenForm}
        />

        <View style={styles.cvContainer}>
          <Text style={styles.cvHeading}>CV / cover cetter</Text>

          {/* CV List */}
          <View>
            {user.student?.cv ? (
              <>
                {user.student?.cv.map((cv, index) => (
                  <CVCard key={index} name={cv.slug as string} createdAt={'today'} />
                ))}
              </>
            ) : (
              <Text style={styles.notFound}>You don't have any CVs yet</Text>
            )}
          </View>

          {/* Button Upload */}
          <GeneralButton
            bgColor={Theme.palette.main.third}
            isAlignCenter={true}
            label="CREATE NEW CV"
            txtColor={Theme.palette.white.primary}
            isLoading={false}
          />
        </View>

        {/* Report Button */}
        <ReportButton handleOpenForm={handleActionOpenForm} />

        {/* Change password Button */}
        <ChangePasswordButton handleOpenForm={handleActionOpenForm} />

        {/* Logout Button */}
        <LogOutButton navigation={navigation} />
        {actions.openForm && <ChangePasswordScreen handleCloseForm={handleActionCloseForm} />}
        {actions.openRegisterForm && (
          <RegisterTeacherScreen handleCloseForm={handleActionCloseForm} />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.main.primary,
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
