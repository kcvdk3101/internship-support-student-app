import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type CustomBadgeProps = {
  visible: boolean
  size: number
  bgColor: string
}

const CustomBadge: React.FC<CustomBadgeProps> = ({
  visible,
  size,
  bgColor,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          backgroundColor: bgColor,
          display: visible ? 'flex' : 'none',
        },
      ]}
    ></View>
  )
}

export default CustomBadge

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 100,
  },
})
