// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { createDrawerNavigator } from '@react-navigation/drawer'
// import TabNavigator, { HomeNavigator } from './TabNavigator'
// import { CVStackNavigator, HomeStackNavigator } from './MainStackNavigator'
// import CustomDrawerContent from './CustomDrawerContent'
// import {
//   CardStyleInterpolators,
//   createStackNavigator,
// } from '@react-navigation/stack'
// import CVScreen from '../../screens/cv/CVScreen'
// import HomeScreen from '../../screens/home/HomeScreen'
// import AccountScreen from '../../screens/account/AccountScreen'
// import CompanyScreen from '../../screens/company/CompanyScreen'

// const Drawer = createDrawerNavigator()

// // Home Stack
// const HomeStack = createStackNavigator()
// export const HomeStackScreen = () => (
//   <HomeStack.Navigator
//     screenOptions={{
//       headerShown: false,
//       cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
//     }}
//   >
//     <HomeStack.Screen name="HomeStack" component={TabNavigator} />
//   </HomeStack.Navigator>
// )

// // Company Stack
// const CompanyStack = createStackNavigator()
// export const CompanyStackScreen = () => (
//   <CompanyStack.Navigator
//     screenOptions={{
//       headerShown: false,
//       cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
//     }}
//   >
//     <CompanyStack.Screen name="Company" component={CompanyScreen} />
//   </CompanyStack.Navigator>
// )

// // CV Stack
// const CVStack = createStackNavigator()
// export const CVStackScreen = () => (
//   <CVStack.Navigator
//     screenOptions={{
//       headerShown: false,
//       cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
//     }}
//   >
//     <CVStack.Screen name="CV" component={CVScreen} />
//   </CVStack.Navigator>
// )

// // Account Stack
// const AccountStack = createStackNavigator()
// export const AccountStackScreen = () => (
//   <AccountStack.Navigator
//     screenOptions={{
//       headerShown: false,
//       cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
//     }}
//   >
//     <AccountStack.Screen name="Account" component={AccountScreen} />
//   </AccountStack.Navigator>
// )

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen name="HomeTab" component={TabNavigator} />
//       {/* <Drawer.Screen name="Home" component={HomeStackScreen} /> */}
//       <Drawer.Screen
//         name="Company"
//         component={CompanyStackScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Drawer.Screen
//         name="CV"
//         component={CVStackScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Drawer.Screen
//         name="AccountTab"
//         component={AccountStackScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//     </Drawer.Navigator>
//   )
// }

// export default DrawerNavigator

// const styles = StyleSheet.create({})

import { Ionicons } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import {
  AccountStackScreen,
  AuthStackScreen,
  ContactStackScreen,
} from './AllStackNavigator'
import CustomerDrawerContent from './CustomDrawerContent'
import TabScreen from './TabNavigator'

const Drawer = createDrawerNavigator()
const DrawerNavigator = () => {
  const drawers = [
    {
      name: 'HomeDrawer',
      screen: TabScreen,
      icon: 'home',
    },

    {
      name: 'ContactDrawer',
      screen: ContactStackScreen,
      icon: 'contacts',
    },
  ]

  const user = useAppSelector((state) => state.auth.user)

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomerDrawerContent {...props} />}
    >
      {drawers.map(({ name, icon, screen }) => (
        <Drawer.Screen
          key={name}
          name={name}
          component={screen}
          options={({ route }) => ({
            drawerIcon: () => (
              <Ionicons name={icon === 'home' ? 'home' : undefined} size={24} />
            ),
            headerShown: route.name === 'ContactDrawer' ? false : true,
          })}
        />
      ))}

      {user ? (
        <>
          <Drawer.Screen
            name="Account"
            component={AccountStackScreen}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen name="Contact" component={ContactStackScreen} />
        </>
      ) : (
        <Drawer.Screen
          name="Login"
          component={AuthStackScreen}
          options={() => ({
            title: 'Login',
            drawerIcon: () => (
              <Ionicons
                name="person"
                size={23}
                color={Theme.palette.main.primary}
              />
            ),
          })}
        />
      )}
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
