import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React, { useState } from 'react'
import Theme from '../../../utils/Theme'
import GeneralButton from '../../buttons/GeneralButton'

type Props = {}

const ForgotPasswordForm = (props: Props) => {
  const [email, setEmail] = useState<string>('')

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.content}
    >
      <View>
        <Text style={styles.title}>Sent us your school email</Text>
        <Text style={styles.subtitle}>We will reset your password</Text>
      </View>

      <TextInput
        autoCompleteType="email"
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        style={styles.textInput}
        textContentType="username"
        placeholder="Email"
        placeholderTextColor={Theme.palette.white.primary}
        // onChangeText={(email) => setEmail(email)}
      />

      <GeneralButton
        bgColor={Theme.palette.main.primary}
        label="Send"
        isAlignCenter={false}
      />
    </KeyboardAvoidingView>
  )
}

export default ForgotPasswordForm

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  title: {
    color: Theme.palette.main.fourth,
    ...Theme.fonts.headline.h5,
  },
  subtitle: {
    color: Theme.palette.black.primary,
    ...Theme.fonts.body.body1,
    marginBottom: 16,
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.palette.black.primary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    color: Theme.palette.paragraph.primary,
    ...Theme.fonts.body.body1,
  },
})
