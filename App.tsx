import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { useState } from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/app/store'
import TabNavigator from './src/navigation/TabNavigator'
import AccountScreen from './src/screens/account/AccountScreen'
import HomeScreen from './src/screens/home/HomeScreen'
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen'
import Theme from './src/utils/Theme'

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
      <StatusBar backgroundColor={Theme.palette.main.primary} />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
      {/* <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="AccountScreen" component={AccountScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer> */}
    </Provider>
  )
}
