import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  HomeStackNavigator,
  CompanyStackNavigator,
  CVStackNavigator,
  AccountStackNavigator,
} from './MainStackNavigator'
import Theme from '../../utils/Theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export const HomeNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: Theme.palette.main.third,
        tabBarStyle: {
          height: 50,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const TabNavigator = () => {
  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  // const user = useAppSelector((state) => state.auth.user)

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: Theme.palette.main.third,
        tabBarStyle: {
          height: 50,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CompanyScreen"
        component={CompanyStackNavigator}
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
        name="CVTab"
        component={CVStackNavigator}
        options={{
          tabBarLabel: 'CV',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file" color={color} size={size} />
          ),
        }}
      />
      {/* {isAuthenticated ||
        (user && (
          <Tab.Screen
            name="AccountScreen"
            component={AccountStackNavigator}
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
        ))} */}
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})
