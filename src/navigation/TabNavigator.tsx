import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Theme from '../utils/Theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import HomeScreen from '../screens/home/HomeScreen'
import CompanyScreen from '../screens/company/CompanyScreen'
import CVScreen from '../screens/cv/CVScreen'
import AccountScreen from '../screens/account/AccountScreen'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
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
            <MaterialCommunityIcons name="home" color={color} size={size} />
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
              name="select-group"
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
            <MaterialCommunityIcons name="file" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})
