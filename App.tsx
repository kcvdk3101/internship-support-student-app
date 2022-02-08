import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { useState } from 'react'
import { Image, StatusBar, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/app/store'
import AccountScreen from './src/screens/account/AccountScreen'
import HomeScreen from './src/screens/home/HomeScreen'
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen'
import Theme from './src/utils/Theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CompanyScreen from './src/screens/company/CompanyScreen'
import CVScreen from './src/screens/cv/CVScreen'

const fetchFonts = () =>
  Font.loadAsync({
    'Roboto-Bold': require('./src/assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),

    'OpenSans-Bold': require('./src/assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    'OpenSans-Regular': require('./src/assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./src/assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
  })

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator()

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
      {true ? (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: Theme.palette.main.third,
              tabBarStyle: {
                height: 50,
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Company"
              component={CompanyScreen}
              options={{
                tabBarLabel: 'Company',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="file"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="CV"
              component={CVScreen}
              options={{
                tabBarLabel: 'CV',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="file"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Account"
              component={AccountScreen}
              options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </Provider>
  )
}
