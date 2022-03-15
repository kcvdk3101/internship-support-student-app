import React from 'react'
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import VerticalInput from '../../components/common/VerticalInput'
import Theme from '../../utils/Theme'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { phoneRegExp } from '../../constant'
import GeneralButton from '../../components/buttons/GeneralButton'

type GeneralInformationScreenProps = {}

type FieldProps = {
  fullName: string
  position: string
  email: string
  phone: number
}

const generalInformation = [
  {
    label: 'Full Name',
    type: 'username',
    inputName: 'fullName',
    placeholder: 'Enter your name',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Position to Apply',
    type: 'name',
    inputName: 'position',
    placeholder: 'Enter position you want to apply',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Email',
    type: 'email',
    inputName: 'email',
    placeholder: 'Enter email',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Phone',
    type: 'number',
    inputName: 'phone',
    placeholder: 'Enter your phone number',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
]

const generalInformationSchema = yup.object({
  fullName: yup.string().required(),
  position: yup.string().required(),
  email: yup.string().email('Invalid email format').required('Required'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
})

const GeneralInformationScreen: React.FC<
  GeneralInformationScreenProps
> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldProps>({
    resolver: yupResolver(generalInformationSchema),
  })

  const onSubmit = (data: FieldProps) => console.log(data)

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: Theme.palette.white.primary,
            borderRadius: 8,
            marginHorizontal: 8,
            marginTop: 8,
            marginBottom: 56,
            padding: 8,
          }}
        >
          <Text
            style={{
              ...Theme.fonts.headline.h6,
            }}
          >
            Profile Information
          </Text>
          <View
            style={{
              flex: 1,
              paddingVertical: 8,
            }}
          >
            {generalInformation.map((info, index) => (
              <VerticalInput
                key={index}
                label={info.label}
                type={info.type}
                inputName={info.inputName}
                placeholder={info.placeholder}
                returnKeyType={info.returnKeyType as ReturnKeyTypeOptions}
                keyboardType={info.keyboardType as KeyboardTypeOptions}
                control={control}
                errors={errors}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '95%',
          marginHorizontal: 8,
          marginBottom: 16,
        }}
      >
        <GeneralButton
          label="Finish to continue"
          bgColor={Theme.palette.main.primary}
          txtColor={Theme.palette.white.primary}
          isAlignCenter={true}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  )
}

export default GeneralInformationScreen

const styles = StyleSheet.create({})
