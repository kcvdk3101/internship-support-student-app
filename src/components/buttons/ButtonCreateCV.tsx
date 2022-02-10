import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from '../../utils/Theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ButtonCreateCV: React.FC = () => {
  return (
    <View style={styles.btnCreateCV}>
      <TouchableOpacity>
        <Text style={styles.btnCreateCVText}>upload / create new cv</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonCreateCV

const styles = StyleSheet.create({
  btnCreateCV: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.palette.main.third,
    borderRadius: 10,
    // marginTop: 25,
    paddingVertical: 18,
    ...Theme.shadow.depth1,
  },
  btnCreateCVText: {
    textTransform: 'uppercase',
    ...Theme.fonts.body.button,
    color: Theme.palette.white.primary,
  },
})
