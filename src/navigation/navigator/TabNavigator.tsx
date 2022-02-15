import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchButton from '../../components/buttons/SearchButton'
import { useAppSelector } from '../../hooks/redux'
import AccountScreen from '../../screens/account/AccountScreen'
import CompanyScreen from '../../screens/company/CompanyScreen'
import CVScreen from '../../screens/cv/CVScreen'
import HomeScreen from '../../screens/home/HomeScreen'
import Theme from '../../utils/Theme'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
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
          // title: 'Company',
          // tabBarLabel: 'Company',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="select-group"
              color={color}
              size={size}
            />
          ),
          header: () => (
            <View style={{ backgroundColor: Theme.palette.main.primary }}>
              <SafeAreaView>
                <SearchButton />
              </SafeAreaView>
            </View>
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
          headerShown: false,
        }}
      />
      {isAuthenticated && (
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
            headerShown: false,
          }}
        />
      )}
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
  companyHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
})
