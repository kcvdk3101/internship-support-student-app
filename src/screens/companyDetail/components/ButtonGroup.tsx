import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Theme from '../../../utils/Theme'
import { screenWidth } from '../../../constant'

type ButtonGroupProps = {
  index: number
  handleChangeIndex: (num: number) => void
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  index,
  handleChangeIndex,
}) => {
  return (
    <View style={styles.buttonGroupcontainer}>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          styles.buttonLeft,
          {
            backgroundColor:
              index === 0
                ? Theme.palette.main.primary
                : Theme.palette.paragraph.primary,
          },
        ]}
        onPress={() => handleChangeIndex(0)}
      >
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          styles.buttonRight,
          {
            backgroundColor:
              index === 1
                ? Theme.palette.main.primary
                : Theme.palette.paragraph.primary,
          },
        ]}
        onPress={() => handleChangeIndex(1)}
      >
        <Text style={styles.buttonText}>Opening</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonGroup

const styles = StyleSheet.create({
  buttonGroupcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: screenWidth * 0.35,
  },
  buttonContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  buttonRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonText: {
    ...Theme.fonts.body.body1,
    color: Theme.palette.white.primary,
  },
})
