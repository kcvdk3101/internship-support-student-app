import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as yup from 'yup'
import Theme from '../../../../utils/Theme'
import { screenHeight } from '../../../../constant'
import { Ionicons } from '@expo/vector-icons'
import VerticalInput from '../../../../components/common/VerticalInput'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch } from '../../../../hooks/redux'
import GeneralButton from '../../../../components/buttons/GeneralButton'
import { resetPassword } from '../../../../features/authenticationSlice'

type ResetPasswordScreenProps = {
  currentEmail: string
  handleCloseModal: () => void
}

type FieldProps = {
  password: string
}

const passwordSchema = yup.object({
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password should be at least 8 characters.'),
})

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  currentEmail,
  handleCloseModal,
}) => {
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldProps>({
    resolver: yupResolver(passwordSchema),
  })

  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FieldProps) => {
    setLoading(true)
    try {
      const response = await dispatch(
        resetPassword({ email: currentEmail, password: data.password }),
      )
      if (response.meta.requestStatus === 'fulfilled') {
        Alert.alert('Reset password successfully!')
      } else {
        Alert.alert('Cannot reset password')
      }
    } catch (error) {
      Alert.alert('Something wrong!')
    } finally {
      setLoading(false)
      handleCloseModal()
    }
  }

  return (
    <View style={styles.container}>
      <VerticalInput
        label={t('Password')}
        type="password"
        inputName="password"
        placeholder={t('Enter password')}
        autoCapitalize="none"
        returnKeyType="done"
        keyboardType="ascii-capable"
        control={control}
        errors={errors}
        editable={!isSubmitting}
      />

      <GeneralButton
        bgColor={Theme.palette.main.primary}
        txtColor={Theme.palette.white.primary}
        onPress={handleSubmit(onSubmit)}
        label={t('Sign in')}
        isLoading={loading}
        isAlignCenter={false}
      />
    </View>
  )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: Theme.palette.white.primary,
    height: screenHeight * 0.6,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Theme.shadow.depth2,
  },
})
