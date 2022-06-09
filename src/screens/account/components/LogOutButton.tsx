import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Theme from '../../../utils/Theme'
import { useAppDispatch } from '../../../hooks/redux'
import { logout } from '../../../features/authenticationSlice'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

type LogOutButtonProps = {
  navigation: NavigationProp<ParamListBase>
}

const LogOutButton: React.FC<LogOutButtonProps> = ({ navigation }) => {
  const dispatch = useAppDispatch()

  function handleLogout() {
    return Alert.alert('Logout', 'Are you sure ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: async () => {
          const response = await dispatch(logout())
          if (response.meta.requestStatus === 'fulfilled') {
            navigation.navigate('HomeTab')
            Alert.alert('Logout successfully')
          } else {
            Alert.alert('Something wrong!')
          }
        },
      },
    ])
  }

  return (
    <View style={styles.signOutContainer}>
      <TouchableOpacity style={styles.btnLogOut} onPress={() => handleLogout()}>
        <View>
          <Image
            style={styles.logOutImage}
            resizeMode="contain"
            source={require('../../../assets/images/icon-logout.png')}
          />
        </View>
        <Text style={styles.logOutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LogOutButton

const styles = StyleSheet.create({
  signOutContainer: {
    ...Theme.shadow.depth2,
    backgroundColor: Theme.palette.white.primary,
    marginHorizontal: 16,
    marginVertical: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnLogOut: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logOutImage: {
    width: 30,
    height: 30,
    tintColor: Theme.palette.red.signOut,
  },
  logOutText: {
    marginLeft: 25,
    color: Theme.palette.red.signOut,
    ...Theme.fonts.headline.h6,
  },
})
