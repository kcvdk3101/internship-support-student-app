import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { screenHeight } from '../../constant'
import Theme from '../../utils/Theme'

type GeneralInformationScreenProps = {}

const GeneralInformationScreen: React.FC<
  GeneralInformationScreenProps
> = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Theme.palette.white.primary,
          margin: 8,
          padding: 8,
        }}
      >
        <Text
          style={{
            ...Theme.fonts.headline.h6,
          }}
        >
          Profile Information
        </Text>
      </View>
    </View>
  )
}

export default GeneralInformationScreen

const styles = StyleSheet.create({})
