import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {}

const AccountScreen = (props: Props) => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <View style={styles.profile}>
        <View style={styles.avatarContainer}>
          <View style={styles.btnEdit}>
            <TouchableOpacity>
              <Image
                style={styles.btnEditImage}
                source={require('../../assets/images/icon-edit.png')}
              />
            </TouchableOpacity>
          </View>
          <Image style={styles.avatar} source={{ uri: user.image }} />
        </View>
        <Text style={styles.profileText}>
          {user.firstName} {user.lastName}
        </Text>
      </View>
      <View>
        <TouchableOpacity>
          <View>
            <Image source={require('../../assets/images/icon-person.png')} />
          </View>
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      {/* <Text>{user.firstName}</Text>
      <Text>{user.lastName}</Text>
      <Text>{user.phone}</Text>
      <Text>{user.email}</Text> */}
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
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    marginTop: 35,
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
    backgroundColor: Theme.palette.main.fourth,
  },
  btnEditImage: {
    tintColor: Theme.palette.white.primary,
  },

  btnEditProfile: {
    marginHorizontal: 16,
  },
})
