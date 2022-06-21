import { yupResolver } from '@hookform/resolvers/yup'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import * as yup from 'yup'
import GeneralButton from '../../../../components/buttons/GeneralButton'
import VerticalInput from '../../../../components/common/VerticalInput'
import { login } from '../../../../features/authenticationSlice'
import { useAppDispatch } from '../../../../hooks/redux'
import Theme from '../../../../utils/Theme'

type LoginFormProps = {
  handleGetLoading: (loading: boolean) => void
  handleDisplayFPScreen: () => void
  handleCloseModal: () => void
  navigation: NavigationProp<ParamListBase> | DrawerNavigationHelpers
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
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@st.huflit.edu.vn/,
      'Please enter correct format',
    ),
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password should be at least 8 characters.'),
})

const LoginForm: React.FC<LoginFormProps> = ({
  handleGetLoading,
  handleDisplayFPScreen,
  navigation,
  handleCloseModal,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '18dh110815@st.huflit.edu.vn',
      password: '31012000',
    },
    resolver: yupResolver(loginSchema),
  })
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FieldProps) => {
    handleGetLoading(true)
    setLoading(true)
    try {
      const response = await dispatch(
        login({
          email: data.email,
          password: data.password,
        }),
      )
      if (response.meta.requestStatus === 'fulfilled') {
        Alert.alert('Login successfully!')
      } else {
        Alert.alert('Something wrong! Try again')
      }
    } catch (error) {
      console.log(error)
    } finally {
      handleCloseModal()
      setLoading(false)
      handleGetLoading(false)
    }
  }

  return (
    <View style={styles.content}>
      <View>
        <Text style={styles.title}>Welcome!</Text>
      </View>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      <VerticalInput
        label="Email"
        type="email"
        inputName="email"
        placeholder="Enter student email"
        autoCapitalize="none"
        returnKeyType="next"
        keyboardType="email-address"
        control={control}
        errors={errors}
        editable={!isSubmitting}
      />

      <VerticalInput
        label="Password"
        type="password"
        inputName="password"
        placeholder="Enter password"
        autoCapitalize="none"
        returnKeyType="done"
        keyboardType="ascii-capable"
        control={control}
        errors={errors}
        editable={!isSubmitting}
      />

      <View style={styles.forgotPasswordContainer}>
        <Pressable onPress={!loading ? handleDisplayFPScreen : () => {}}>
          <Text style={styles.textButton}>Forgot password?</Text>
        </Pressable>
      </View>

      <GeneralButton
        bgColor={Theme.palette.main.primary}
        txtColor={Theme.palette.white.primary}
        onPress={handleSubmit(onSubmit)}
        label="Sign in"
        isLoading={loading}
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
