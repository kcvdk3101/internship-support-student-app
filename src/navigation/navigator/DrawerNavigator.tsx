import { Ionicons } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { useAppSelector } from '../../hooks/redux'
import AccountScreen from '../../screens/account/AccountScreen'
import NotificationScreen from '../../screens/notification/NotificationScreen'
import Theme from '../../utils/Theme'
import { CVFormStackScreen } from './AllStackNavigator'
import CustomerDrawerContent from './CustomDrawerContent'
import TabNavigator from './TabNavigator'

const Drawer = createDrawerNavigator()
const DrawerNavigator = () => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomerDrawerContent {...props} />}
      initialRouteName="MenuTab"
      screenOptions={{
        headerStyle: {
          height: 80,
          backgroundColor: Theme.palette.white.primary,
        },
      }}
    >
      <Drawer.Screen
        name="MenuTab"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationScreen}
        options={({ navigation }) => ({
          drawerActiveBackgroundColor: Theme.palette.main.third,
          headerLeft: () => (
            <Pressable style={styles.positionLeft} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={28} color={Theme.palette.black.primary} />
            </Pressable>
          ),
        })}
      />
      <Drawer.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="CVForm"
        component={CVFormStackScreen}
        options={({ navigation, route }) => ({
          headerShown: false,
        })}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({
  positionLeft: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
})
