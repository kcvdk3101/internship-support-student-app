import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '../../../constant'
import { Ionicons } from '@expo/vector-icons'
import ChangePasswordForm from './ChangePasswordForm'
import Theme from '../../../utils/Theme'

type ChangePasswordScreenProps = {
  visible: boolean
  handleCloseForm: (
    action: 'openForm' | 'openRegisterForm' | 'openReportForm' | 'openSendEmailTeacher',
  ) => void
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({
  visible,
  handleCloseForm,
}) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            height: screenHeight,
            justifyContent: 'flex-end',
          }}
        >
          <View style={styles.container}>
            <Ionicons
              name="close"
              onPress={() => handleCloseForm('openForm')}
              size={30}
              style={{ width: 50 }}
            />
            <ChangePasswordForm handleCloseModal={() => handleCloseForm('openForm')} />
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
