import { Ionicons } from '@expo/vector-icons'
import { DrawerHeaderProps } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { Image, Pressable, StyleSheet } from 'react-native'
import AccountScreen from '../../screens/account/AccountScreen'
import AdditionalInformationScreen from '../../screens/additionalInformation/AdditionalInformationScreen'
import CertificationScreen from '../../screens/additionalInformation/components/CertificationScreen'
import ProjectScreen from '../../screens/additionalInformation/components/ProjectScreen'
import AuthenticationScreen from '../../screens/authentication/AuthenticationScreen'
import CompanyScreen from '../../screens/company/CompanyScreen'
import CompanyDetailScreen from '../../screens/companyDetail/CompanyDetailScreen'
import ContactScreen from '../../screens/contact/ContactScreen'
import CVScreen from '../../screens/cv/CVScreen'
import CVFormScreen from '../../screens/cvForm/CVFormScreen'
import TechnicalSkillsScreen from '../../screens/generalInformation/components/TechnicalSkillsScreen'
import GeneralInformationScreen from '../../screens/generalInformation/GeneralInformationScreen'
import HomeScreen from '../../screens/home/HomeScreen'
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
      name="Company Screen"
      component={CompanyScreen}
      options={{
        headerStyle: {
          backgroundColor: Theme.palette.white.primary,
        },
        headerLeft: () => (
          <Pressable style={styles.positionLeft} onPress={() => props.navigation.openDrawer()}>
            <Ionicons name="menu" size={28} color={Theme.palette.black.primary} />
          </Pressable>
        ),
        headerTitle: () => (
          <Image
            source={require('../../assets/images/huflit.png')}
            resizeMode="contain"
            style={styles.tinyLogo}
          />
        ),
      }}
    />
    <CompanyStack.Screen
      name="CompanyDetailScreen"
      component={CompanyDetailScreen}
      options={{
        headerShown: false,
      }}
    />
  </CompanyStack.Navigator>
)

// CV Stack
const CVStack = createStackNavigator()
export const CVStackScreen = () => (
  <CVStack.Navigator
    screenOptions={({ navigation }) => ({
      headerLeft: () => (
        <Pressable style={styles.positionLeft} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color={Theme.palette.black.primary} />
        </Pressable>
      ),
    })}
  >
    <CVStack.Screen
      name="Your CV"
      component={CVScreen}
      options={{
        headerShown: false,
      }}
    />
  </CVStack.Navigator>
)

// CV Form Stack
const CVFormStack = createStackNavigator()
export const CVFormStackScreen = () => (
  <CVFormStack.Navigator
    screenOptions={({ navigation }) => ({
      headerLeft: () => (
        <Pressable style={styles.positionLeft} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={Theme.palette.black.primary} />
        </Pressable>
      ),
    })}
  >
    <CVFormStack.Screen
      name="CVFormScreen"
      component={CVFormScreen}
      options={{
        headerTitle: 'Create FITSI CV',
        headerStyle: {
          height: 80,
          backgroundColor: Theme.palette.white.primary,
        },
      }}
    />
    <CVFormStack.Screen
      name="GeneralInformationScreen"
      component={GeneralInformationScreen}
      options={{
        headerTitle: 'General Information',
        headerStyle: {
          height: 80,
          backgroundColor: Theme.palette.white.primary,
        },
      }}
    />
    <CVFormStack.Screen
      name="AdditionalInformationScreen"
      component={AdditionalInformationScreen}
      options={({ navigation }) => ({
        headerTitle: 'Additional Information',
        headerStyle: {
          height: 80,
          backgroundColor: Theme.palette.white.primary,
        },
        headerLeft: () => (
          <Pressable style={styles.positionLeft} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color={Theme.palette.black.primary} />
          </Pressable>
        ),
      })}
    />
    <CVFormStack.Screen
      name="TechnicalSkillsScreen"
      component={TechnicalSkillsScreen}
      options={({ navigation }) => ({
        headerTitle: 'Technical Skills',
        headerStyle: {
          height: 80,
          backgroundColor: Theme.palette.white.primary,
        },
        headerLeft: () => (
          <Pressable style={styles.positionLeft} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color={Theme.palette.black.primary} />
          </Pressable>
        ),
      })}
    />
    {/* <CVFormStack.Screen
      name="LanguagesScreen"
      component={LanguagesScreen}
      options={({ navigation }) => ({
        headerTitle: 'Languages',
        headerStyle: {
          height: 80,
          backgroundColor: Theme.palette.white.primary,
        },
        headerLeft: () => (
          <Pressable style={styles.positionLeft} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color={Theme.palette.black.primary} />
          </Pressable>
        ),
      })}
    /> */}
    <CVFormStack.Screen
      name="ProjectScreen"
      component={ProjectScreen}
      options={({ navigation }) => ({
        headerTitle: 'Project',
        headerStyle: {
          height: 80,
          backgroundColor: Theme.palette.white.primary,
        },
        headerLeft: () => (
          <Pressable style={styles.positionLeft} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Theme.palette.black.primary} />
          </Pressable>
        ),
      })}
    />
    <CVFormStack.Screen
      name="CertificationScreen"
      component={CertificationScreen}
      options={({ navigation }) => ({
        headerTitle: 'CertificationScreen',
        headerStyle: {
          height: 80,
          backgroundColor: Theme.palette.white.primary,
        },
        headerLeft: () => (
          <Pressable style={styles.positionLeft} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Theme.palette.black.primary} />
          </Pressable>
        ),
      })}
    />
  </CVFormStack.Navigator>
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

const styles = StyleSheet.create({
  positionLeft: {
    position: 'absolute',
    top: 4,
    left: 16,
  },
  tinyLogo: {
    width: 90,
  },
})
