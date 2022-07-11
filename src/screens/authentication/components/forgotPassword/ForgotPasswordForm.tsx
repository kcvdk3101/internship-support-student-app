import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import Theme from '../../../../utils/Theme'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import GeneralButton from '../../../../components/buttons/GeneralButton'
import VerticalInput from '../../../../components/common/VerticalInput'
import { logout, resetPasswordCode } from '../../../../features/authenticationSlice'
import { useAppDispatch } from '../../../../hooks/redux'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { useTranslation } from 'react-i18next'

type ForgotPasswordFormProps = {
  loading: boolean
  navigation: NavigationProp<ParamListBase> | DrawerNavigationHelpers
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  goToNextSlide: () => void
  handleCloseModal: () => void
  handleCurrentEmail: (email: string) => void
}

type FieldProps = {
  email: string
}

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Mail is required')
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@st.huflit.edu.vn/,
      'Please enter correct format',
    ),
})

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  loading,
  navigation,
  setLoading,
  goToNextSlide,
  handleCloseModal,
  handleCurrentEmail,
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
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
    return Alert.alert('Reset password', 'Are you sure to reset your password ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: async () => {
          setLoading(true)
          try {
            const response = await dispatch(resetPasswordCode(data.email))
            if (response.meta.requestStatus === 'fulfilled') {
              setLoading(false)
              handleCurrentEmail(data.email)
            } else {
              Alert.alert('Send password code fail')
            }
          } catch (error) {
            Alert.alert('Something wrong!')
          } finally {
            goToNextSlide()
            setLoading(false)
          }
        },
      },
    ])
  }

  return (
    <View style={styles.content}>
      <View>
        <Text style={styles.title}>{t('Sent us your student email')}</Text>
        <Text style={styles.subtitle}>{t('We will reset your password')}</Text>
      </View>

      <View
        style={{
          marginBottom: 28,
        }}
      >
        <VerticalInput
          label={t('Email')}
          type="email"
          inputName="email"
          placeholder={t('Enter email')}
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="email-address"
          control={control}
          errors={errors}
          editable={!loading}
        />
      </View>

      <GeneralButton
        bgColor={Theme.palette.main.primary}
        label={t('Send')}
        onPress={handleSubmit(onSubmit)}
        isAlignCenter={false}
        txtColor={Theme.palette.white.primary}
        isLoading={loading}
      />
    </View>
  )
}

export default ForgotPasswordForm

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: Theme.palette.main.primary,
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
