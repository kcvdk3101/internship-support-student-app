import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { screenWidth } from '../../constant'
import Theme from '../../utils/Theme'
import ForgotPasswordScreen from './components/forgotPassword/ForgotPasswordScreen'
import LoginScreen from './components/login/LoginScreen'
import PasswordCodeScreen from './components/passwordCode/PasswordCodeScreen'
import ResetPasswordScreen from './components/resetPassword/ResetPasswordScreen'

type AuthenticationScreenProps = {
  visible: boolean
  navigation: NavigationProp<ParamListBase> | DrawerNavigationHelpers
  handleShowModal: () => void
  handleCloseModal: () => void
}

const AuthenticationScreen: React.FC<AuthenticationScreenProps> = ({
  handleShowModal,
  handleCloseModal,
  navigation,
  visible,
}) => {
  const [currentEmail, setCurrentEmail] = useState('')
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const [displayFPScreen, setDisplayFPScreen] = useState<boolean>(false)

  const scrollRef = useRef<ScrollView>(null)

  const handleDisplayFPScreen = () => {
    setDisplayFPScreen(!displayFPScreen)
    goToNextSlide()
  }

  const handleCurrentEmail = (email: string) => {
    setCurrentEmail(email)
  }

  const updateCurrentSlideIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / screenWidth)
    setCurrentSlideIndex(currentIndex)
  }

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1
    scrollRef.current?.scrollTo({ x: nextSlideIndex * screenWidth, animated: true })
    setCurrentSlideIndex(currentSlideIndex + 1)
  }

  const goBackSlide = () => {
    const nextSlideIndex = currentSlideIndex - 1
    scrollRef.current?.scrollTo({ x: nextSlideIndex * screenWidth, animated: true })
    setCurrentSlideIndex(currentSlideIndex - 1)
  }

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <ScrollView
          ref={scrollRef}
          style={{ backgroundColor: Theme.palette.background.modal }}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          onMomentumScrollEnd={updateCurrentSlideIndex}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              width: screenWidth,
              justifyContent: 'flex-end',
            }}
          >
            <LoginScreen
              handleCloseModal={handleCloseModal}
              handleDisplayFPScreen={handleDisplayFPScreen}
              navigation={navigation}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              width: screenWidth,
              justifyContent: 'flex-end',
            }}
          >
            <ForgotPasswordScreen
              navigation={navigation}
              goBackSlide={goBackSlide}
              goToNextSlide={goToNextSlide}
              handleShowModal={handleShowModal}
              handleCloseModal={handleCloseModal}
              handleCurrentEmail={handleCurrentEmail}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              width: screenWidth,
              justifyContent: 'flex-end',
            }}
          >
            <PasswordCodeScreen currentEmail={currentEmail} goToNextSlide={goToNextSlide} />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              width: screenWidth,
              justifyContent: 'flex-end',
            }}
          >
            <ResetPasswordScreen currentEmail={currentEmail} handleCloseModal={handleCloseModal} />
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    </View>
  )
}

export default AuthenticationScreen

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-end',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgb(93, 95, 222)',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
})
