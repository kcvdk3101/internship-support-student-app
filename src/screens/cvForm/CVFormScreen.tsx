import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BeginningForm from './components/BeginningForm'

type CVFormScreenProps = {}

const CVFormScreen: React.FC<CVFormScreenProps> = () => {
  const getFormByStep = (step: number) => {
    switch (step) {
      case 0:
        return <BeginningForm />
      default:
        break
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text>CVFormScreen</Text>
      </View>
    </SafeAreaView>
  )
}

export default CVFormScreen

const styles = StyleSheet.create({})
