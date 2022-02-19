import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Theme from '../../../utils/Theme'
import GeneralButton from '../../buttons/GeneralButton'

type LoginFormProps = {
  handleDisplayFPScreen: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ handleDisplayFPScreen }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = () => {
    console.log('clicked')
  }

  return (
    <View style={styles.content}>
      <View>
        <Text style={styles.title}>Welcome!</Text>
      </View>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      <TextInput
        autoCapitalize="none"
        autoCompleteType="email"
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        style={styles.textInput}
        textContentType="username"
        placeholder="Email"
        placeholderTextColor={Theme.palette.white.primary}
        value={email}
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput
        autoCapitalize="none"
        autoCompleteType="password"
        autoCorrect={false}
        returnKeyType="done"
        textContentType="password"
        secureTextEntry
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor={Theme.palette.white.primary}
        value={password}
        onChangeText={(password) => setPassword(password)}
      />

      <View style={styles.forgotPasswordContainer}>
        <Pressable onPress={handleDisplayFPScreen}>
          <Text style={styles.textButton}>Forgot password?</Text>
        </Pressable>
      </View>

      <GeneralButton
        bgColor={Theme.palette.main.primary}
        onPress={handleLogin}
        label="Sign in"
        isAlignCenter={false}
      />
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-end',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
    marginBottom: 16,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.palette.black.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  label: {
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    width: 80,
  },
  subtitle: {
    color: Theme.palette.black.primary,
    ...Theme.fonts.body.body1,
    marginBottom: 16,
  },
  textButton: {
    color: Theme.palette.black.primary,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
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
  title: {
    color: Theme.palette.main.fourth,
    ...Theme.fonts.headline.h5,
  },
})
