import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Theme from '../../../../utils/Theme'
import LoginForm from './LoginForm'

type LoginScreenProps = {
  handleShowModal: () => void
  handleDisplayFPScreen: () => void
}

const height = Dimensions.get('screen').height

const LoginScreen: React.FC<LoginScreenProps> = ({
  handleShowModal,
  handleDisplayFPScreen,
}) => {
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
      <LoginForm handleDisplayFPScreen={handleDisplayFPScreen} />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})
