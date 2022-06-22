import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenHeight } from '../../../constant'
import { Ionicons } from '@expo/vector-icons'
import Theme from '../../../utils/Theme'

type ReportScreenProps = {
  handleCloseForm: (action: string) => void
}

const ReportScreen: React.FC<ReportScreenProps> = ({ handleCloseForm }) => {
  return (
    <View>
      <Modal animationType="slide" visible={true}>
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
              onPress={() => handleCloseForm('openReportForm')}
              size={30}
              style={{ width: 50 }}
            />
            {/* <ChangePasswordForm handleCloseModal={() => handleCloseForm('openForm')} /> */}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

export default ReportScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: Theme.palette.white.primary,
    height: screenHeight,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Theme.shadow.depth2,
  },
})
