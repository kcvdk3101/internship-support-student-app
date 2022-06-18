import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import VerticalInput from '../../../components/common/VerticalInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import GeneralButton from '../../../components/buttons/GeneralButton'
import Theme from '../../../utils/Theme'

type ChangePasswordFormProps = {
  handleCloseModal: () => void
}

type FieldProps = {
  currentPassword: string
  newPassword: string
}

const cpSchema = yup.object({
  currentPassword: yup.string(),
})

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ handleCloseModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldProps>({
    resolver: yupResolver(cpSchema),
  })

  const onSubmit = (data: FieldProps) => {}

  return (
    <View
      style={{
        justifyContent: 'flex-end',
      }}
    >
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
        inputName="currentPassword"
        placeholder="Enter new password"
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
        label="Sign in"
        isLoading={!isSubmitting}
        isAlignCenter={false}
      />
    </View>
  )
}

export default ChangePasswordForm

const styles = StyleSheet.create({})
