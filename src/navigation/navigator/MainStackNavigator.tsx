import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AccountScreen from '../../screens/account/AccountScreen'
import CompanyScreen from '../../screens/company/CompanyScreen'
import CVScreen from '../../screens/cv/CVScreen'
import HomeScreen from '../../screens/home/HomeScreen'
const Stack = createStackNavigator()

export const HomeStackNavigator = () => {
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

export const CompanyStackNavigator = () => {
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
export const CVStackNavigator = () => {
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

export const AccountStackNavigator = () => {
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
