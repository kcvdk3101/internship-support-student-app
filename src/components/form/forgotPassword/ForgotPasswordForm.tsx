import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Theme from '../../../utils/Theme'
import GeneralButton from '../../buttons/GeneralButton'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type ForgotPasswordFormProps = {}

type FieldProps = {
  email: string
}

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Mail is required')
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter correct format',
    ),
})

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: FieldProps) => {
    console.log(data)
  }

  return (
    <View style={styles.content}>
      <View>
        <Text style={styles.title}>Sent us your school email</Text>
        <Text style={styles.subtitle}>We will reset your password</Text>
      </View>

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

      <GeneralButton
        bgColor={Theme.palette.main.primary}
        label="Send"
        onPress={handleSubmit(onSubmit)}
        isAlignCenter={false}
      />
    </View>
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
    marginTop: 8,
    color: Theme.palette.paragraph.primary,
    ...Theme.fonts.body.body1,
  },
})
