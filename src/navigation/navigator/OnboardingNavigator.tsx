import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OnboardingScreen from '../../screens/onboarding/OnboardingScreen'

const OnboardingStack = createStackNavigator()

const OnboardingNavigator: React.FC = () => {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
      />
    </OnboardingStack.Navigator>
  )
}

export default OnboardingNavigator

const styles = StyleSheet.create({})
