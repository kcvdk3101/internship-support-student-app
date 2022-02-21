import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../../screens/home/HomeScreen'
import CompanyScreen from '../../screens/company/CompanyScreen'
import CVScreen from '../../screens/cv/CVScreen'
import AccountScreen from '../../screens/account/AccountScreen'
const Stack = createStackNavigator()

type Props = {}

export const HomeStackNavigator = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export const CompanyStackNavigator = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Company"
        component={CompanyScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
export const CVStackNavigator = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CV"
        component={CVScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export const AccountStackNavigator = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
