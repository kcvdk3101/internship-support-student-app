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
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
        },
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View
        style={[
          styles.btn,
          {
            alignSelf: isAlignCenter ? 'center' : 'stretch',
          },
        ]}
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
      </View>
    </TouchableOpacity>
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
    ...Theme.fonts.headline.h6,
  },
})
