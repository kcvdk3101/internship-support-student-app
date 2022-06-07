import { Ionicons } from '@expo/vector-icons'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Theme from '../../../../utils/Theme'
import LoginForm from './LoginForm'

type LoginScreenProps = {
  handleDisplayFPScreen: () => void
  handleCloseModal: () => void
  navigation: NavigationProp<ParamListBase> | DrawerNavigationHelpers
}

const height = Dimensions.get('screen').height

const LoginScreen: React.FC<LoginScreenProps> = ({
  handleCloseModal,
  handleDisplayFPScreen,
  navigation,
}) => {
  const [getLoading, setGetLoading] = useState(false)

  const handleGetLoading = (loading: boolean) => {
    setGetLoading(loading)
  }

  useEffect(() => {
    return () => {
      setGetLoading(false)
    }
  }, [])

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
        onPress={!getLoading ? handleCloseModal : () => {}}
        size={30}
        style={{ width: 50 }}
      />
      <LoginForm
        handleDisplayFPScreen={handleDisplayFPScreen}
        navigation={navigation}
        handleCloseModal={handleCloseModal}
        handleGetLoading={handleGetLoading}
      />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})
