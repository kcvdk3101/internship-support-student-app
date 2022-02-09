import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { IS_FIRST_TIME } from '../constant'
import { useAppSelector } from '../hooks/redux'
import OnboardingNavigator from './navigator/OnboardingNavigator'
import TabNavigator from './navigator/TabNavigator'

const Stack = createStackNavigator()

const AppNavigator: React.FC = () => {
  const isFirstTimeOpen = useAppSelector((state) => state.auth.isFirstTimeOpen)

  const [value, setValue] = useState<string | null>(null)
  const unmounted = useRef(true)

  const isFirstTime = async () => {
    const firstOpen = await AsyncStorage.getItem(IS_FIRST_TIME)
    setValue(firstOpen)
    if (!unmounted.current) return null
  }

  useEffect(() => {
    isFirstTime()
    return () => {
      unmounted.current = false
    }
  }, [])

  return (
    <NavigationContainer>
      {!isFirstTimeOpen && value === null ? (
        <OnboardingNavigator />
      ) : (
        <TabNavigator />
      )}
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})
