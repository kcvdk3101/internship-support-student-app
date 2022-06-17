import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import GeneralButton from '../../components/buttons/GeneralButton'
import { getCVByStudentId } from '../../features/cvSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CVModel } from '../../models/cv.model'
import Theme from '../../utils/Theme'
import LogOutButton from './components/LogOutButton'

type AccountScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)

  const [studentCV, setStudentCV] = useState<CVModel[]>([])

  useEffect(() => {
    if (typeof user.id !== 'string' && user.id === undefined) {
      navigation.navigate('HomeTab')
    }
  }, [user])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await dispatch(
          getCVByStudentId({ studentId: user.id, limit: 10, offset: 0 }),
        )
        if (response.meta.requestStatus === 'fulfilled') {
          setStudentCV(response.payload as CVModel[])
        }
      } catch (error) {
        Alert.alert('Cannot load your CV')
      }
    })()
    return () => {
      setStudentCV([])
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.headingContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} style={styles.icon} />
          </Pressable>
        </View>

        <View style={styles.profile}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{ uri: 'https://picsum.photos/id/237/200/300' }} />
          </View>
          <Text style={styles.profileText}>
            {user?.lastName} {user?.firstName}
          </Text>
          <Text>Đang thực tập</Text>
          <Text>Đang thực tập</Text>
          <Text>Đang thực tập</Text>
        </View>

        <View style={styles.cvContainer}>
          <Text style={styles.cvHeading}>CV / cover cetter</Text>

          {/* CV List */}
          <View>
            {studentCV.length > 0 ? (
              <>
                {/* {cvData.map((cv, index) => (
                  <CVCard
                    key={index}
                    name={cv.name}
                    createdAt={cv.createdAt}
                    createdBy={cv.createdBy}
                  />
                ))} */}
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

        {/* Change password Button */}
        <View style={styles.changePasswordContainer}>
          <TouchableOpacity style={styles.btnChangePassword}>
            <Ionicons name="lock-closed" size={24} color="black" />
            <Text style={styles.changePasswordText}>Change password</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <LogOutButton navigation={navigation} />
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
    margin: 8,
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
  notFound: { ...Theme.fonts.headline.h6, marginBottom: 16 },
  changePasswordContainer: {
    ...Theme.shadow.depth2,
    backgroundColor: Theme.palette.white.primary,
    marginHorizontal: 16,
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnChangePassword: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  editProfileImage: {
    width: 30,
    height: 30,
  },
  changePasswordText: {
    marginLeft: 16,
    color: Theme.palette.main.third,
    ...Theme.fonts.headline.h6,
  },
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
