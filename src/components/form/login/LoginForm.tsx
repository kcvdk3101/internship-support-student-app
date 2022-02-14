import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const deviceHeight = Dimensions.get('screen').height

const LoginForm = (props: Props) => {
  return (
    <View>
      <Text>LoginForm</Text>
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({})
