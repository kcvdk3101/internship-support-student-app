import { Ionicons } from '@expo/vector-icons'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import studentApi from '../../api/university/studentApi'
import teacherApi from '../../api/university/teacherApi'
import GeneralButton from '../../components/buttons/GeneralButton'
import CVCard from '../../components/cards/CVCard'
import { useAppSelector } from '../../hooks/redux'
import { StudentModel } from '../../models/student.model'
import { TeacherModel } from '../../models/teacher.model'
import Theme from '../../utils/Theme'
import { Utils } from '../../utils/Utils'
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
  const user = useAppSelector((state) => state.auth.user)
  const CVs = useAppSelector((state) => state.cv.CVs)

  const [actions, setActions] = useState({
    openForm: false,
    openRegisterForm: false,
    openReportForm: false,
  })
  const [teacher, setTeacher] = useState<TeacherModel>({
    id: '',
    firstName: '',
    lastName: '',
    fullName: '',
    position: '',
    department: '',
    email: '',
    phoneNumber: '',
    studentAmount: 0,
    maximumStudentAmount: 0,
  })

  useEffect(() => {
    ;(async () => {
      try {
        let teacherId = await AsyncStorageLib.getItem('@teacherId')
        if (teacherId === null) return

        const response = await teacherApi.getTeacherById(teacherId)
        console.log(response)
        if (response.teacher.length > 0) {
          setTeacher(response.teacher[0])
        }
      } catch (error) {}
    })()
  }, [])

  useEffect(() => {
    if ((typeof user.id !== 'string' && user.id === undefined) || '' || null) {
      navigation.navigate('HomeTab')
    }
  }, [user])

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

        <TeacherInformation teacher={teacher} handleActionOpenForm={handleActionOpenForm} />

        <View style={styles.cvContainer}>
          <Text style={styles.cvHeading}>CV / cover cetter</Text>

          {/* CV List */}
          <ScrollView scrollEnabled style={{ height: CVs.length > 0 ? 400 : 'auto' }}>
            {CVs && CVs.length > 0 ? (
              <>
                {CVs.map((cv, index) => (
                  <CVCard
                    key={index}
                    name={cv.name}
                    position={`Position: ${cv.position}`}
                    createdAt={`Created at : ${Utils.convertDateString(cv.createdAt)}`}
                  />
                ))}
              </>
            ) : (
              <Text style={styles.notFound}>You don't have any CVs yet</Text>
            )}
          </ScrollView>

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
        {/* <ReportButton handleOpenForm={handleActionOpenForm} /> */}

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
