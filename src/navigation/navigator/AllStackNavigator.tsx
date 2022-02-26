import { createStackNavigator } from '@react-navigation/stack'
import AccountScreen from '../../screens/account/AccountScreen'
import AuthenticationScreen from '../../screens/authentication/AuthenticationScreen'
import CompanyScreen from '../../screens/company/CompanyScreen'
import ContactScreen from '../../screens/contact/ContactScreen'
import CVScreen from '../../screens/cv/CVScreen'
import HomeScreen from '../../screens/home/HomeScreen'

// Home Stack
const HomeStack = createStackNavigator()
export const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
  </HomeStack.Navigator>
)

// Authentication Stack
const AuthStack = createStackNavigator()
export const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="AuthScreen" component={AuthenticationScreen} />
  </AuthStack.Navigator>
)

// Company Stack
const CompanyStack = createStackNavigator()
export const CompanyStackScreen = () => (
  <CompanyStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <CompanyStack.Screen name="CompanyScreen" component={CompanyScreen} />
  </CompanyStack.Navigator>
)

// CV Stack
const CVStack = createStackNavigator()
export const CVStackScreen = () => (
  <CVStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <CVStack.Screen name="CVScreen" component={CVScreen} />
  </CVStack.Navigator>
)

// Account Stack
const AccountStack = createStackNavigator()
export const AccountStackScreen = () => (
  <AccountStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AccountStack.Screen name="AccountScreen" component={AccountScreen} />
  </AccountStack.Navigator>
)

// Contact Stack
const ContactStack = createStackNavigator()
export const ContactStackScreen = () => (
  <ContactStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <ContactStack.Screen name="ContactScreen" component={ContactScreen} />
  </ContactStack.Navigator>
)
