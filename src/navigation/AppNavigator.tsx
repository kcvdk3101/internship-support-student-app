import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { IS_FIRST_TIME } from '../constant'
import { useAppSelector } from '../hooks/redux'
import DrawerNavigator from './navigator/DrawerNavigator'
import OnboardingNavigator from './navigator/OnboardingNavigator'

const AppNavigator: React.FC = () => {
  const isFirstTimeOpen = useAppSelector((state) => state.auth.isFirstTimeOpen)

  const [value, setValue] = useState<string | null>(null)
  const isFirstTime = async () => {
    const firstOpen = await AsyncStorageLib.getItem(IS_FIRST_TIME)
    setValue(firstOpen)
  }

  // FUNCTION USED FOR TESTING FIRST TIME OPEN APP
  const clearStorageData = async () => {
    await AsyncStorageLib.clear()
  }

  useEffect(() => {
    // clearStorageData()
    isFirstTime()
  }, [])

  return (
    <NavigationContainer>
      {!isFirstTimeOpen && value === null ? <OnboardingNavigator /> : <DrawerNavigator />}
    </NavigationContainer>
  )
}

export default AppNavigator
