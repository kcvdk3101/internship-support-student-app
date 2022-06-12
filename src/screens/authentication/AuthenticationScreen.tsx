import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import {
  Dimensions,
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

type AuthenticationScreenProps = {
  handleShowModal: () => void
  handleCloseModal: () => void
  navigation: NavigationProp<ParamListBase> | DrawerNavigationHelpers
}

const AuthenticationScreen: React.FC<AuthenticationScreenProps> = ({
  handleShowModal,
  handleCloseModal,
  navigation,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const [displayFPScreen, setDisplayFPScreen] = useState<boolean>(false)

  const scrollRef = useRef<ScrollView>(null)

  const handleDisplayFPScreen = () => {
    setDisplayFPScreen(!displayFPScreen)
    goToNextSlide()
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
      <Modal animationType="slide" transparent={true} visible={true}>
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
            <ForgotPasswordScreen goBackSlide={goBackSlide} handleShowModal={handleShowModal} />
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
