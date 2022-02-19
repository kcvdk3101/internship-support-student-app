import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

type VerticalLabelInputProps = {
  label: string
}

const VerticalLabelInput: React.FC<VerticalLabelInputProps> = ({ label }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput autoCapitalize="none" />
    </View>
  )
}

export default VerticalLabelInput

const styles = StyleSheet.create({})
