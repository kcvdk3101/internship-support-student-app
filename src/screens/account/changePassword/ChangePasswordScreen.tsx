import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '../../../constant'
import { Ionicons } from '@expo/vector-icons'
import ChangePasswordForm from './ChangePasswordForm'
import Theme from '../../../utils/Theme'

type ChangePasswordScreenProps = {
  handleCloseForm: () => void
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ handleCloseForm }) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            height: screenHeight,
            justifyContent: 'flex-end',
          }}
        >
          <View style={styles.container}>
            <Ionicons name="close" onPress={handleCloseForm} size={30} style={{ width: 50 }} />
            <ChangePasswordForm handleCloseModal={handleCloseForm} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: Theme.palette.white.primary,
    height: screenHeight * 0.45,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Theme.shadow.depth2,
  },
})
