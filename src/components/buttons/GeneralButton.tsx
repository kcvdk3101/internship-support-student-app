import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Theme from '../../utils/Theme'
// import Theme from '../../../utils/Theme'

type GeneralButtonProps = {
  isAlignCenter: boolean
  bgColor: string
  txtColor: string
  label: string
  onPress?: () => void
}

const GeneralButton: React.FC<GeneralButtonProps> = ({
  isAlignCenter,
  bgColor,
  txtColor,
  label,
  onPress,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.btn,
          {
            alignSelf: isAlignCenter ? 'center' : 'stretch',
          },
        ]}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            {
              color: txtColor,
            },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default GeneralButton

const styles = StyleSheet.create({
  container: {
    ...Theme.shadow.depth1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 100,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // color: Theme.palette.white.primary,
    ...Theme.fonts.headline.h6,
  },
})
