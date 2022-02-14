import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Theme from '../../utils/Theme'
// import Theme from '../../../utils/Theme'

type LoginButtonProps = {
  handleLogin: () => void
}

const LoginButton: React.FC<LoginButtonProps> = ({ handleLogin }) => {
  return (
    <View style={styles.loginContainer}>
      <TouchableOpacity
        style={styles.btnLogin}
        activeOpacity={0.9}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginButton

const styles = StyleSheet.create({
  loginContainer: {
    ...Theme.shadow.depth2,
    backgroundColor: Theme.palette.main.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 100,
    alignSelf: 'center',
  },
  btnLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: Theme.palette.white.primary,
    ...Theme.fonts.headline.h6,
  },
})