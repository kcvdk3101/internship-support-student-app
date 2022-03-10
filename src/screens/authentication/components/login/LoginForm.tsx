import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Theme from '../../../../utils/Theme'
import GeneralButton from '../../../../components/buttons/GeneralButton'

type LoginFormProps = {
  handleDisplayFPScreen: () => void
}

type FieldProps = {
  email: string
  password: string
}

const loginSchema = yup.object({
  email: yup
    .string()
    .required('Mail is required')
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter correct format',
    ),
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password should be at least 8 characters.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password contains at least 8 characters, 1 uppercase letter, ' +
        '1 lowercase letter, 1 number and 1 special character!',
    ),
})

const LoginForm: React.FC<LoginFormProps> = ({ handleDisplayFPScreen }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = (data: FieldProps) => Alert.alert(JSON.stringify(data))

  return (
    <View style={styles.content}>
      <View>
        <Text style={styles.title}>Welcome!</Text>
      </View>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            onBlur={onBlur}
            keyboardType="email-address"
            returnKeyType="next"
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor={Theme.palette.white.primary}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={{ color: Theme.palette.red.error }}>
          This field is required
        </Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            onBlur={onBlur}
            secureTextEntry
            textContentType="password"
            returnKeyType="done"
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={Theme.palette.white.primary}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="password"
      />
      {errors.email && (
        <Text style={{ color: Theme.palette.red.error }}>
          This field is required
        </Text>
      )}

      <View style={styles.forgotPasswordContainer}>
        <Pressable onPress={handleDisplayFPScreen}>
          <Text style={styles.textButton}>Forgot password?</Text>
        </Pressable>
      </View>

      <GeneralButton
        bgColor={Theme.palette.main.primary}
        onPress={handleSubmit(onSubmit)}
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
    marginVertical: 8,
    color: Theme.palette.paragraph.primary,
    ...Theme.fonts.body.body1,
  },
  title: {
    color: Theme.palette.main.fourth,
    ...Theme.fonts.headline.h5,
  },
})
