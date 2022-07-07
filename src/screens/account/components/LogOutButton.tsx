import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { logout } from '../../../features/authenticationSlice'
import { useAppDispatch } from '../../../hooks/redux'
import Theme from '../../../utils/Theme'

type LogOutButtonProps = {
  navigation: NavigationProp<ParamListBase>
}

const LogOutButton: React.FC<LogOutButtonProps> = ({ navigation }) => {
  const { t } = useTranslation()
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
        <Ionicons name="log-out" size={28} color="black" />
        <Text style={styles.logOutText}>{t('Sign out')}</Text>
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

  logOutText: {
    marginLeft: 12,
    color: Theme.palette.red.signOut,
    ...Theme.fonts.headline.h6,
  },
})
