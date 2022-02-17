import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import LoginForm from '../../../components/form/login/LoginForm'
import Theme from '../../../utils/Theme'

type LoginScreenProps = {
  handleShowModal: () => void
  handleLogin: () => void
  handleDisplayFPScreen: () => void
}

const height = Dimensions.get('screen').height

const LoginScreen: React.FC<LoginScreenProps> = ({
  handleShowModal,
  handleLogin,
  handleDisplayFPScreen,
}) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  return (
    <View
      style={{
        justifyContent: 'center',
        backgroundColor: Theme.palette.white.primary,
        height: height * 0.6,
        paddingHorizontal: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        ...Theme.shadow.depth2,
      }}
    >
      <Ionicons
        name="close"
        onPress={handleShowModal}
        size={30}
        style={{ width: 50 }}
      />

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Ionicons name="arrow-forward" onPress={handleShowModal} size={30} />
      </View> */}
      <LoginForm
        handleLogin={handleLogin}
        handleDisplayFPScreen={handleDisplayFPScreen}
      />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})
