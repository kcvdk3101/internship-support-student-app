import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, View } from 'react-native'
import * as yup from 'yup'
import GeneralButton from '../../../components/buttons/GeneralButton'
import VerticalInput from '../../../components/common/VerticalInput'
import { changePassword } from '../../../features/authenticationSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import Theme from '../../../utils/Theme'

type ChangePasswordFormProps = {
  handleCloseModal: (action: string) => void
}

type FieldProps = {
  currentPassword: string
  newPassword: string
}

const cpSchema = yup.object({
  currentPassword: yup
    .string()
    .required('This field is required')
    .test('checkCurrentPassword', 'Not match with current password', async (value) => {
      let currentPassword = await AsyncStorageLib.getItem('@password')
      if (value === currentPassword) return true
      return false
    }),
  newPassword: yup
    .string()
    .required('This field is required')
    .min(8, 'Min length is 8')
    .max(15, 'Max length is 15'),
})

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ handleCloseModal }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { id } = useAppSelector((state) => state.auth.user)
  const hasChangedPassword = useAppSelector((state) => state.auth.hasChangedPassword)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldProps>({
    mode: 'onChange',
    resolver: yupResolver(cpSchema),
  })

  const onSubmit = async (data: FieldProps) => {
    try {
      const response = await dispatch(changePassword({ userId: id, data }))
      if (response.meta.requestStatus === 'fulfilled') {
        Alert.alert('Password changed successfully!')
      } else {
        Alert.alert('Cannot change your password! Please try again')
      }
    } catch (error) {
      Alert.alert('Something wrong')
    } finally {
      handleCloseModal('openForm')
    }
  }

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        marginTop: 8,
      }}
    >
      <View style={styles.form}>
        <VerticalInput
          label={t('Current password')}
          type="password"
          inputName="currentPassword"
          placeholder={t('Enter current password')}
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="ascii-capable"
          control={control}
          errors={errors}
          editable={!isSubmitting}
        />
        <VerticalInput
          label={t('New password')}
          type="password"
          inputName="newPassword"
          placeholder={t('Enter new password')}
          autoCapitalize="none"
          returnKeyType="done"
          keyboardType="ascii-capable"
          control={control}
          errors={errors}
          editable={!isSubmitting}
        />
      </View>

      <GeneralButton
        bgColor={Theme.palette.main.primary}
        txtColor={Theme.palette.white.primary}
        onPress={handleSubmit(onSubmit)}
        label={t('Change')}
        isLoading={isSubmitting}
        isAlignCenter={false}
      />
    </View>
  )
}

export default ChangePasswordForm

const styles = StyleSheet.create({
  form: {
    marginBottom: 8,
  },
})
