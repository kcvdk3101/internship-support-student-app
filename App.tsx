import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { StatusBar, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/app/store'
import * as Font from 'expo-font'
import { useState } from 'react'
import AppLoading from 'expo-app-loading'
import Home from './src/Home'
import Theme from './src/utils/Theme'
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
    <Provider store={store}>
      <StatusBar backgroundColor="#7166D9" />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding Screen" component={OnboardingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.main.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Theme.fonts.body.body1,
    color: Theme.palette.white.primary,
  },
})
