import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { splashSlides } from '../../utils/SplashData'
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

const { width } = Dimensions.get('window')

const renderItem = (item: FlatListProps) => {
  return (
    <View style={styles.slideContainer}>
      <Image
        source={item.image}
        style={styles.slideImage}
        resizeMode="contain"
      />
      <Text style={styles.slideText}>{item.title}</Text>
    </View>
  )
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)

  const flatListRef = useRef<FlatList>(null)
  const updateCurrentSlideIndex = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndex(currentIndex)
  }

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1
    if (nextSlideIndex != splashSlides.length) {
      const offset = nextSlideIndex * width
      flatListRef.current?.scrollToOffset({ offset, animated: true })
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }

  const skip = () => {
    const lastSlideIndex = splashSlides.length - 1
    const offset = lastSlideIndex * width
    flatListRef.current?.scrollToOffset({ offset, animated: true })
    setCurrentSlideIndex(lastSlideIndex)
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
    width: width,
  },
  slideText: {
    marginTop: 30,
    color: Theme.palette.white.primary,
    ...Theme.fonts.headline.h4,
  },
})
