import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { splashSlides } from '../../../db/SplashData'
import Theme from '../../../utils/Theme'

type IndicatorListProps = {
  currentSlideIndex: number
  navigation: NavigationProp<ParamListBase>
  goToNextSlide: () => void
  skip: () => void
  startOpenApp: () => void
}

const { height } = Dimensions.get('window')

const IndicatorList: React.FC<IndicatorListProps> = ({
  currentSlideIndex,
  navigation,
  goToNextSlide,
  skip,
  startOpenApp,
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
                width: 20,
                backgroundColor: Theme.palette.white.primary,
              },
            ]}
          />
        ))}
      </View>
      <View style={styles.btnGroupContainer}>
        {currentSlideIndex == splashSlides.length - 1 ? (
          <View style={styles.btnGetStarted}>
            <TouchableOpacity style={styles.btn} onPress={startOpenApp}>
              <Text style={styles.btnText}>get started</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,
                {
                  borderColor: Theme.palette.white.primary,
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                },
              ]}
              onPress={skip}
            >
              <Text
                style={[
                  styles.btnText,
                  {
                    color: Theme.palette.white.primary,
                  },
                ]}
              >
                skip
              </Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={goToNextSlide}
            >
              <Text style={styles.btnText}>next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

export default IndicatorList

const styles = StyleSheet.create({
  indicatorContainer: {
    height: height * 0.2,
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
    backgroundColor: Theme.palette.black.primary,
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btnGroupContainer: {
    marginBottom: 20,
  },
  btnGetStarted: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: 52,
  },
  btnText: {
    ...Theme.fonts.body.button,
    textTransform: 'uppercase',
    color: Theme.palette.black.primary,
  },
  btn: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 15,
    backgroundColor: Theme.palette.white.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
