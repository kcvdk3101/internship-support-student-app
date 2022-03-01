import { createStackNavigator } from '@react-navigation/stack'
import { Pressable } from 'react-native'
import AccountScreen from '../../screens/account/AccountScreen'
import AuthenticationScreen from '../../screens/authentication/AuthenticationScreen'
import CompanyScreen from '../../screens/company/CompanyScreen'
import CompanyDetailScreen from '../../screens/companyDetail/CompanyDetailScreen'
import ContactScreen from '../../screens/contact/ContactScreen'
import CVScreen from '../../screens/cv/CVScreen'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from '../../screens/home/HomeScreen'
import { DrawerHeaderProps } from '@react-navigation/drawer'
import Theme from '../../utils/Theme'

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
export const CompanyStackScreen = (props: DrawerHeaderProps) => (
  <CompanyStack.Navigator>
    <CompanyStack.Screen
      name="CompanyScreen"
      component={CompanyScreen}
      options={{
        headerLeft: () => (
          <Pressable
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
            }}
            onPress={() => props.navigation.openDrawer()}
          >
            <Ionicons
              name="menu"
              size={28}
              color={Theme.palette.black.primary}
            />
          </Pressable>
        ),
      }}
    />
    <CompanyStack.Screen
      name="CompanyDetailScreen"
      component={CompanyDetailScreen}
      options={({ navigation }) => ({
        title: 'Company Detail',
        headerLeftLabelVisible: false,
        headerStyle: { backgroundColor: 'transparent' },
        headerLeft: () => (
          <Pressable
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color={Theme.palette.black.primary}
            />
          </Pressable>
        ),
      })}
    />
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
