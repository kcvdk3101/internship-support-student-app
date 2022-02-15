import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React, { useState } from 'react'
import LoginForm from '../../components/form/login/LoginForm'
import Theme from '../../utils/Theme'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import LoginButton from '../../components/buttons/LoginButton'

type LoginScreenProps = {
  handleShowModal: () => void
  handleLogin: () => void
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  handleShowModal,
  handleLogin,
}) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end',
          }}
        >
          <LoginForm
            handleLogin={handleLogin}
            handleShowModal={handleShowModal}
          />
        </View>
      </Modal>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'rgb(93, 95, 222)',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
})
