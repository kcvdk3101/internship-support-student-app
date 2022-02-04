import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from './utils/Theme'

type Props = {}

const Home = (props: Props) => {
  return (
    <View>
      <Text style={styles.homeText}>Link to Home Screen</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  homeText: {
    fontFamily: 'OpenSans-Regular',
    color: Theme.palette.red.signOut,
  },
})
