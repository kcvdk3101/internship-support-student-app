import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import VerticalInput from '../../../components/common/VerticalInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import GeneralButton from '../../../components/buttons/GeneralButton'
import Theme from '../../../utils/Theme'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { changePassword } from '../../../features/authenticationSlice'
import axios from 'axios'

type ChangePasswordFormProps = {
  handleCloseModal: () => void
}

type FieldProps = {
  currentPassword: string
  newPassword: string
}

const cpSchema = yup.object({
  currentPassword: yup.string().required('This field is required'),
  newPassword: yup.string().required('This field is required'),
})

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ handleCloseModal }) => {
  const dispatch = useAppDispatch()
  const { id } = useAppSelector((state) => state.auth.user)
  const hasChangedPassword = useAppSelector((state) => state.auth.hasChangedPassword)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldProps>({
    resolver: yupResolver(cpSchema),
  })

  const onSubmit = async (data: FieldProps) => {
    try {
      await dispatch(changePassword({ userId: id, data }))
      if (hasChangedPassword) {
        Alert.alert('Password changed successfully!')
      } else {
        Alert.alert('Something wrong')
      }
    } catch (error) {
      Alert.alert(error as any)
    } finally {
      handleCloseModal()
    }
  }

  return (
    <View
      style={{
        justifyContent: 'flex-end',
      }}
    >
      <View style={styles.form}>
        <VerticalInput
          label="Current password"
          type="password"
          inputName="currentPassword"
          placeholder="Enter current password"
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="ascii-capable"
          control={control}
          errors={errors}
          editable={!isSubmitting}
        />
        <VerticalInput
          label="New password"
          type="password"
          inputName="newPassword"
          placeholder="Enter new password"
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
        label="Change"
        isLoading={isSubmitting}
        isAlignCenter={false}
      />
    </View>
  )
}

export default ChangePasswordForm

const styles = StyleSheet.create({
  form: {
    marginBottom: 32,
  },
})
