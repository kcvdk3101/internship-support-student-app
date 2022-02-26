import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const ContactScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>ContactScreen</Text>
    </View>
  )
}

export default ContactScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
