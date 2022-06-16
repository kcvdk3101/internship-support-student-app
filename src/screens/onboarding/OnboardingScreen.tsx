import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { screenWidth } from '../../constant'
import { splashSlides } from '../../db/SplashData'
import { openedApp } from '../../features/authenticationSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import IndicatorList from './components/IndicatorList'

type OnboardingScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

type FlatListProps = {
  id: number
  image: any
  title: string
}

const renderItem = (item: FlatListProps) => {
  return (
    <View style={styles.slideContainer}>
      <Image source={item.image} style={styles.slideImage} resizeMode="contain" />
      <Text style={styles.slideText}>{item.title}</Text>
    </View>
  )
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const isFirstTimeOpen = useAppSelector((state) => state.auth.isFirstTimeOpen)

  const dispatch = useAppDispatch()

  const flatListRef = useRef<FlatList>(null)

  const updateCurrentSlideIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / screenWidth)
    setCurrentSlideIndex(currentIndex)
  }

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1
    if (nextSlideIndex != splashSlides.length) {
      const offset = nextSlideIndex * screenWidth
      flatListRef.current?.scrollToOffset({ offset, animated: true })
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }

  const skip = () => {
    const lastSlideIndex = splashSlides.length - 1
    const offset = lastSlideIndex * screenWidth
    flatListRef.current?.scrollToOffset({ offset, animated: true })
    setCurrentSlideIndex(lastSlideIndex)
  }

  const startOpenApp = async () => {
    dispatch(openedApp(!isFirstTimeOpen))
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={splashSlides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        renderItem={({ item }) => renderItem(item)}
      />
      <IndicatorList
        currentSlideIndex={currentSlideIndex}
        navigation={navigation}
        goToNextSlide={goToNextSlide}
        skip={skip}
        startOpenApp={startOpenApp}
      />
    </SafeAreaView>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.main.primary,
  },
  slideContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: screenWidth,
  },
  slideText: {
    marginTop: 30,
    color: Theme.palette.white.primary,
    ...Theme.fonts.headline.h4,
  },
})
