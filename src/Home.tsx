import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from './utils/Theme'

type Props = {}

const Home = (props: Props) => {
  return (
    <View>
      <View style={styles.homeBox} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  homeBox: {
    ...Theme.shadow.depth2,
    width: 200,
    height: 200,
    backgroundColor: Theme.palette.red.signOut,
  },
})
