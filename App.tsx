import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { useState } from 'react'
import { StatusBar } from 'react-native'
import HomeScreen from './src/screens/home/HomeScreen'
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen'

const fetchFonts = () =>
  Font.loadAsync({
    'Roboto-Bold': require('./src/assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),

    'OpenSans-Bold': require('./src/assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    'OpenSans-Regular': require('./src/assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./src/assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
  })

const Stack = createStackNavigator()

export default function App() {
  const [loadedAsset, setLoadedAsset] = useState(false)

  if (!loadedAsset) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoadedAsset(true)}
        onError={() => setLoadedAsset(false)}
      />
    )
  }

  return (
    <>
      <StatusBar backgroundColor="#7166D9" />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
