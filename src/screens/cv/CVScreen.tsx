import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const CVScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>CV Screen</Text>
    </View>
  )
}

export default CVScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
