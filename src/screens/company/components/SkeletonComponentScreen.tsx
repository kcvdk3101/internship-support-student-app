import { StyleSheet, Text, Animated, View } from 'react-native'
import React, { useEffect } from 'react'

type SkeletonComponentScreenProps = {}

const SkeletonComponentScreen: React.FC<SkeletonComponentScreenProps> = () => {
  let circleAnimatedValue = new Animated.Value(0)

  useEffect(() => {
    circleAnimated()
  }, [])

  const circleAnimated = () => {
    circleAnimatedValue.setValue(0)
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 350,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        circleAnimated()
      }, 1000)
    })
  }

  const translateX = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 100],
  })

  const translateX2 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 200],
  })

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 60,
            backgroundColor: '#ECEFF1',
            overflow: 'hidden',
            marginRight: 16,
          }}
        >
          <Animated.View
            style={{
              width: '30%',
              opacity: 0.5,
              height: '100%',
              backgroundColor: 'white',
              transform: [{ translateX: translateX }],
            }}
          ></Animated.View>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-evenly', overflow: 'hidden' }}>
          <Animated.View style={{ backgroundColor: '#ECEFF1', height: 32 }}>
            <Animated.View
              style={{
                width: '20%',
                height: '100%',
                backgroundColor: 'white',
                opacity: 0.5,
                transform: [{ translateX: translateX2 }],
              }}
            ></Animated.View>
          </Animated.View>
          <View style={{ backgroundColor: '#ECEFF1', height: 32 }}>
            <Animated.View
              style={{
                width: '20%',
                height: '100%',
                backgroundColor: 'white',
                opacity: 0.5,
                transform: [{ translateX: translateX2 }],
              }}
            ></Animated.View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default SkeletonComponentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    padding: 16,
    shadowColor: 'black',
    borderRadius: 4,
    marginVertical: 12,
    backgroundColor: '#FAFAFA',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    flexDirection: 'row',
  },
})
