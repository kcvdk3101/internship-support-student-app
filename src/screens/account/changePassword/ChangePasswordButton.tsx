import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Theme from '../../../utils/Theme'

type ChangePasswordButtonProps = {
  handleOpenForm: () => void
}

const ChangePasswordButton: React.FC<ChangePasswordButtonProps> = ({ handleOpenForm }) => {
  return (
    <View style={styles.changePasswordContainer}>
      <TouchableOpacity style={styles.btnChangePassword} onPress={handleOpenForm}>
        <Ionicons name="lock-closed" size={24} color="black" />
        <Text style={styles.changePasswordText}>Change password</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChangePasswordButton

const styles = StyleSheet.create({
  changePasswordContainer: {
    ...Theme.shadow.depth2,
    backgroundColor: Theme.palette.white.primary,
    marginHorizontal: 16,
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnChangePassword: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  changePasswordText: {
    marginLeft: 16,
    color: Theme.palette.main.third,
    ...Theme.fonts.headline.h6,
  },
})
