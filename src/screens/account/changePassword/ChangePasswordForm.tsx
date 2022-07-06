import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
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
    console.log(data)
    try {
      await dispatch(changePassword({ userId: id, data }))
      if (hasChangedPassword) {
        Alert.alert('Password changed successfully!')
      } else {
        Alert.alert('Cannot change your password')
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
          keyboardType="numeric"
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
