import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const CompanyScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>Company Screen</Text>
    </View>
  )
}

export default CompanyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
