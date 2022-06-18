import { Ionicons } from '@expo/vector-icons'
import {
  DrawerHeaderProps,
  DrawerNavigationHelpers,
} from '@react-navigation/drawer/lib/typescript/src/types'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { screenHeight } from '../../../../constant'
import Theme from '../../../../utils/Theme'
import ForgotPasswordForm from './ForgotPasswordForm'

type ForgotPasswordScreenProps = {
  navigation: NavigationProp<ParamListBase> | DrawerNavigationHelpers
  goBackSlide: () => void
  handleShowModal: () => void
  handleCloseModal: () => void
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
  goBackSlide,
  handleShowModal,
  handleCloseModal,
}) => {
  const [loading, setLoading] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Ionicons name="arrow-back" size={30} onPress={loading ? () => {} : goBackSlide} />
        <Ionicons name="close" onPress={loading ? () => {} : handleShowModal} size={30} />
      </View>
      <ForgotPasswordForm
        loading={loading}
        setLoading={setLoading}
        navigation={navigation}
        handleCloseModal={handleCloseModal}
      />
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
  top: {
    flexShrink: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
})
