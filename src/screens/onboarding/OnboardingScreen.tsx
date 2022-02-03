import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
} from 'react-native'
import React from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { splashSlides } from '../../utils/SplashData'

type OnboardingScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

type FlatListProps = {
  id: number
  image: any
  title: string
}

const { width, height } = Dimensions.get('window')

const renderItem = (item: FlatListProps) => {
  return (
    <View style={styles.slide}>
      <Image
        source={item.image}
        style={styles.slideImage}
        resizeMode="contain"
      />
    </View>
  )
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  console.log(navigation)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#7166D9" />
      <FlatList
        data={splashSlides}
        contentContainerStyle={{ height: height * 0.75 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => renderItem(item)}
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
  slide: {
    alignItems: 'center',
  },
  slideImage: {
    height: '75%',
    width: width,
  },
})
