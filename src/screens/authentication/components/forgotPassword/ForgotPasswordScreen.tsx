import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Theme from '../../../../utils/Theme'
import { screenHeight } from '../../../../constant'
import ForgotPasswordForm from './ForgotPasswordForm'

type ForgotPasswordScreenProps = {
  goBackSlide: () => void
  handleShowModal: () => void
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  goBackSlide,
  handleShowModal,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexShrink: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Ionicons name="arrow-back" size={30} onPress={goBackSlide} />
        <Ionicons name="close" onPress={handleShowModal} size={30} />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <ForgotPasswordForm />
      </View>
    </View>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: Theme.palette.white.primary,
    height: screenHeight * 0.6,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Theme.shadow.depth2,
  },
})
