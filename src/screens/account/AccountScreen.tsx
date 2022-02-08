import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
} from 'react-native'
import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EditProfileButton from './components/EditProfileButton'
import LogOutButton from './components/LogOutButton'
import Avatar from './components/Avatar'
import { cvData } from '../../utils/CVData'
import ButtonCreateCV from './components/CVList/ButtonCreateCV'
import CVItem from './components/CVList/CVItem'

type Props = {}

const AccountScreen = (props: Props) => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        <Text style={styles.heading}>Profile</Text>
        {/* Avatar */}
        <Avatar user={user} />

        {/* Edit Profile Button */}
        <EditProfileButton />

        <View style={styles.cvContainer}>
          <Text style={styles.cvHeading}>CV / cover cetter</Text>

          {/* CV List */}
          <ScrollView>
            {cvData.map((cv, index) => (
              <CVItem
                key={index}
                name={cv.name}
                createdAt={cv.createdAt}
                createdBy={cv.createdBy}
              />
            ))}
          </ScrollView>

          {/* Button Upload */}
          <ButtonCreateCV />
        </View>

        {/* Logout Button */}
        <LogOutButton />
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
  heading: {
    marginVertical: 20,
    marginHorizontal: 16,
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
})