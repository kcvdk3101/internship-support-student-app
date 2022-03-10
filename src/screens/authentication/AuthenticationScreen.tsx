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
import Theme from '../../utils/Theme'
import ForgotPasswordScreen from './components/forgotPassword/ForgotPasswordScreen'
import LoginScreen from './components/login/LoginScreen'

type AuthenticationScreenProps = {
  handleShowModal: () => void
}

const width = Dimensions.get('screen').width

const AuthenticationScreen: React.FC<AuthenticationScreenProps> = ({
  handleShowModal,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const [displayFPScreen, setDisplayFPScreen] = useState<boolean>(false)

  const scrollRef = useRef<ScrollView>(null)

  const handleDisplayFPScreen = () => {
    setDisplayFPScreen(!displayFPScreen)
    goToNextSlide()
  }

  const updateCurrentSlideIndex = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndex(currentIndex)
  }

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1
    scrollRef.current?.scrollTo({ x: nextSlideIndex * width, animated: true })
    setCurrentSlideIndex(currentSlideIndex + 1)
  }

  const goBackSlide = () => {
    const nextSlideIndex = currentSlideIndex - 1
    scrollRef.current?.scrollTo({ x: nextSlideIndex * width, animated: true })
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
              width: width,
              justifyContent: 'flex-end',
            }}
          >
            <LoginScreen
              handleShowModal={handleShowModal}
              handleDisplayFPScreen={handleDisplayFPScreen}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              width: width,
              justifyContent: 'flex-end',
            }}
          >
            <ForgotPasswordScreen
              goBackSlide={goBackSlide}
              handleShowModal={handleShowModal}
            />
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
