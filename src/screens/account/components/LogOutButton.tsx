import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Theme from '../../../utils/Theme'

type Props = {}

const LogOutButton = (props: Props) => {
  return (
    <View style={styles.signOutContainer}>
      <TouchableOpacity style={styles.btnLogOut}>
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
