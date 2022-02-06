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

type Props = {}

const renderItem = (item: { name: string; createdAt: string }) => (
  <View>
    <Text>{item.name}</Text>
    <Text>{item.createdAt}</Text>
  </View>
)

const AccountScreen = (props: Props) => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Profile</Text>
        {/* Avatar */}
        <Avatar user={user} />

        {/* Edit Profile Button */}
        <EditProfileButton />

        <View style={styles.cvContainer}>
          <Text style={styles.cvHeading}>CV / cover cetter</Text>
          <FlatList data={cvData} renderItem={({ item }) => renderItem(item)} />
          <View>
            <TouchableOpacity>
              <Text>upload / create new cv</Text>
            </TouchableOpacity>
          </View>
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
