import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import GeneralButton from '../../components/buttons/GeneralButton'
import CVCard from '../../components/cards/CVCard'
import { cvData } from '../../db/CVData'
import { useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import Avatar from './components/Avatar'
import EditProfileButton from './components/EditProfileButton'
import LogOutButton from './components/LogOutButton'

type AccountScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.headingContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} style={styles.icon} />
          </Pressable>
        </View>
        {/* Avatar */}
        <Avatar user={user} />

        {/* Edit Profile Button */}
        <EditProfileButton />

        <View style={styles.cvContainer}>
          <Text style={styles.cvHeading}>CV / cover cetter</Text>

          {/* CV List */}
          <ScrollView>
            {cvData.map((cv, index) => (
              <CVCard
                key={index}
                name={cv.name}
                createdAt={cv.createdAt}
                createdBy={cv.createdBy}
              />
            ))}
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
    marginVertical: 20,
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
})
