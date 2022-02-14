import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Theme from '../../utils/Theme'

type VerticalInputProps = {
  type: string
  label: string
  error?: string
}

const VerticalInput: React.FC<VerticalInputProps> = ({
  type,
  label,
  error,
}) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        keyboardType="ascii-capable"
      />
      <Text style={styles.errorText}>error</Text>
    </View>
  )
}

export default VerticalInput

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
  },
  input: {
    borderWidth: 1,
  },
  errorText: {
    marginTop: 8,
    color: Theme.palette.red.signOut,
  },
})
