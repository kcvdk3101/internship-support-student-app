import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from '../../utils/Theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

type ChipButtonProps = {
  name: string
  bgColor?: string
  txtColor?: string
  fsize?: number
  disabled?: boolean
  mrgnV?: number
  handleClick?: () => void
}

const ChipButton: React.FC<ChipButtonProps> = ({
  name,
  fsize,
  bgColor = Theme.palette.paragraph.secondary,
  txtColor = Theme.palette.white.primary,
  disabled = false,
  mrgnV = 10,
  handleClick,
}) => {
  return (
    <View
      style={[
        styles.chipContainer,
        {
          backgroundColor: bgColor,
          marginVertical: mrgnV,
        },
      ]}
    >
      <TouchableOpacity onPress={handleClick} disabled={disabled}>
        <Text
          style={[
            styles.chipText,
            {
              color: txtColor,
              fontSize: fsize,
            },
          ]}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChipButton

const styles = StyleSheet.create({
  chipContainer: {
    alignSelf: 'flex-start',
    backgroundColor: Theme.palette.paragraph.secondary,
    // marginVertical: 10,
    marginRight: 4,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
    ...Theme.shadow.depth1,
  },
  chipText: {
    ...Theme.fonts.body.body1,
    color: Theme.palette.white.primary,
  },
})
