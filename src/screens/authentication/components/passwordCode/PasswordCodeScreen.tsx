import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { KeycodeInput } from 'react-native-keycode'
import { screenHeight } from '../../../../constant'
import { checkIsValidResetPassword } from '../../../../features/authenticationSlice'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import Theme from '../../../../utils/Theme'

type PasswordCodeScreenProps = {
  currentEmail: string
  goToNextSlide: () => void
}

const PasswordCodeScreen: React.FC<PasswordCodeScreenProps> = ({ currentEmail, goToNextSlide }) => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hệ thống đã gửi mã code qua mail của bạn! </Text>
      <Text style={styles.subtext}>Vui lòng kiểm tra mail trong hộp thư</Text>
      <View style={styles.content}>
        <KeycodeInput
          length={6}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          onComplete={async (completedValue) => {
            try {
              const response = await dispatch(
                checkIsValidResetPassword({
                  email: currentEmail,
                  resetPasswordCode: Number(completedValue),
                }),
              )
              if (response.meta.requestStatus === 'fulfilled') {
                goToNextSlide()
              } else {
                Alert.alert('Wrong password code!')
              }
            } catch (error) {
              Alert.alert('Something wrong!')
            }
          }}
        />
      </View>
    </View>
  )
}

export default PasswordCodeScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: Theme.palette.white.primary,
    height: screenHeight * 0.6,
    paddingHorizontal: 24,
    paddingVertical: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Theme.shadow.depth2,
  },
  text: {
    ...Theme.fonts.headline.h5,
    color: Theme.palette.main.primary,
    marginBottom: 8,
  },
  subtext: {
    ...Theme.fonts.body.body1,
    color: Theme.palette.black.primary,
    marginBottom: 28,
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
