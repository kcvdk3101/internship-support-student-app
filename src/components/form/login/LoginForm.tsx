import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Theme from '../../../utils/Theme'
import { Ionicons } from '@expo/vector-icons'
import LoginButton from '../../buttons/LoginButton'

type LoginFormProps = {
  handleLogin: () => void
  handleDisplayFPScreen: () => void
}

const height = Dimensions.get('screen').height

const LoginForm: React.FC<LoginFormProps> = ({
  handleLogin,
  handleDisplayFPScreen,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.content}
    >
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
        // onChangeText={(email) => setEmail(email)}
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
        // onChangeText={(password) => setPassword(password)}
      />

      <View style={styles.forgotPasswordContainer}>
        <Pressable onPress={handleDisplayFPScreen}>
          <Text style={styles.textButton}>Forgot password?</Text>
        </Pressable>
      </View>

      <LoginButton handleLogin={handleLogin} isAlignCenter={false} />
    </KeyboardAvoidingView>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
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
