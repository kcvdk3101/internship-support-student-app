import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TabNavigator from './TabNavigator'
import { CVStackNavigator } from './MainStackNavigator'
import CustomDrawerContent from './CustomDrawerContent'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeTab" component={TabNavigator} />
      <Drawer.Screen name="CVTab" component={CVStackNavigator} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({})
