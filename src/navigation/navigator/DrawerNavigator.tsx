import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TabNavigator, { HomeNavigator } from './TabNavigator'
import { CVStackNavigator, HomeStackNavigator } from './MainStackNavigator'
import CustomDrawerContent from './CustomDrawerContent'
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import CVScreen from '../../screens/cv/CVScreen'
import HomeScreen from '../../screens/home/HomeScreen'
import AccountScreen from '../../screens/account/AccountScreen'

const Drawer = createDrawerNavigator()

// Home Stack
const HomeStack = createStackNavigator()
export const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <HomeStack.Screen name="HomeStack" component={TabNavigator} />
  </HomeStack.Navigator>
)

// CV Stack
const CVStack = createStackNavigator()
export const CVStackScreen = () => (
  <CVStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <CVStack.Screen name="CV" component={CVScreen} />
  </CVStack.Navigator>
)

// Account Stack
const AccountStack = createStackNavigator()
export const AccountStackScreen = () => (
  <AccountStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <AccountStack.Screen name="Account" component={AccountScreen} />
  </AccountStack.Navigator>
)

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* <Drawer.Screen name="HomeTab" component={TabNavigator} /> */}
      <Drawer.Screen name="Home" component={HomeStackScreen} />
      <Drawer.Screen
        name="CV"
        component={CVStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountStackScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({})
