import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React from 'react'
import { screenHeight } from '../../../constant'
import { Ionicons } from '@expo/vector-icons'
import Theme from '../../../utils/Theme'
import RegisterTeacherForm from './RegisterTeacherForm'

type RegisterTeacherScreenProps = {
  handleCloseForm: (action: string) => void
}

const RegisterTeacherScreen: React.FC<RegisterTeacherScreenProps> = ({ handleCloseForm }) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={true}>
        <SafeAreaView>
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
                onPress={() => handleCloseForm('openRegisterForm')}
                size={30}
                style={{ width: 50 }}
              />
              <RegisterTeacherForm />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </View>
  )
}

export default RegisterTeacherScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: Theme.palette.white.primary,
    height: screenHeight * 0.4,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Theme.shadow.depth2,
  },
})
