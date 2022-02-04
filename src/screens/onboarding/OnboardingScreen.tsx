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
  TouchableOpacity,
  View,
} from 'react-native'
import { splashSlides } from '../../utils/SplashData'

type OnboardingScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

type FlatListProps = {
  id: number
  image: any
  title: string
}

type IndicatorListProps = {
  currentSlideIndex: number
  navigation: NavigationProp<ParamListBase>
}

const { width, height } = Dimensions.get('window')

const IndicatorList: React.FC<IndicatorListProps> = ({
  currentSlideIndex,
  navigation,
}) => {
  return (
    <View style={styles.indicatorContainer}>
      <View style={styles.indicatorList}>
        {splashSlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex === index && {
                backgroundColor: '#F8F8FF',
                width: 20,
              },
            ]}
          />
        ))}
      </View>
      <View style={{ marginBottom: 20 }}>
        {currentSlideIndex == splashSlides.length - 1 ? (
          <View style={{ height: 50 }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('HomeScreen')}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,
                {
                  borderColor: '#fff',
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                },
              ]}
              // onPress={skip}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: '#fff',
                }}
              >
                SKIP
              </Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity
              activeOpacity={0.8}
              // onPress={goToNextSlide}
              style={styles.btn}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                }}
              >
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

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

  // const ref = useRef<OnboardingScreenProps>({

  // })

  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndex(currentIndex)
  }

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1
    if (nextSlideIndex != splashSlides.length) {
      const offset = nextSlideIndex * width
      // ref.current.scrollToOffset({ offset })
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }

  const skip = () => {
    const lastSlideIndex = splashSlides.length - 1
    const offset = lastSlideIndex * width
    // ref.current.scrollToOffset({ offset })
    setCurrentSlideIndex(lastSlideIndex)
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
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
      />
    </SafeAreaView>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7166D9',
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
    color: '#F8F8FF',
    // fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 37,
  },
  indicatorContainer: {
    height: height * 0.25,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  indicatorList: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 10,
    height: 2.5,
    backgroundColor: '#424242',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
