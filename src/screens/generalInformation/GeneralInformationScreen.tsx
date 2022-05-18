import React, { useState } from 'react'
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
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useAppSelector } from '../../hooks/redux'
import ChipButton from '../../components/buttons/ChipButton'
import { StudentModel } from '../../models'

type GeneralInformationScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

type FieldProps = {
  fullName: string
  position: string
  email: string
  phone: string
  gender: string
  city: string
  address: string
}

const generalInformationSchema = yup.object({
  fullName: yup.string().required(),
  position: yup.string().required(),
  email: yup.string().email('Invalid email format').required(),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
  address: yup.string().required(),
})

const GeneralInformationScreen: React.FC<GeneralInformationScreenProps> = ({ navigation }) => {
  const { fullName, email, birthDate, phoneNumber, address } = useAppSelector(
    (state) => state.auth.user as StudentModel,
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldProps>({
    resolver: yupResolver(generalInformationSchema),
    defaultValues: {
      fullName,
      email,
      phone: phoneNumber,
      address,
    },
  })

  const { skills } = useAppSelector((state) => state.cv.curCV.details)

  const onSubmit = (data: FieldProps) => {
    navigation.navigate('AdditionalInformationScreen')
  }

  const generalInformation = [
    {
      label: 'Full Name',
      type: 'username',
      inputName: 'fullName',
      placeholder: 'Enter your full name',
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
      placeholder: '',
      returnKeyType: 'next',
      keyboardType: 'default',
    },
    {
      label: 'Phone',
      type: 'number',
      inputName: 'phone',
      placeholder: '',
      returnKeyType: 'next',
      keyboardType: 'default',
    },
    {
      label: 'Address',
      type: 'name',
      inputName: 'address',
      placeholder: '',
      returnKeyType: 'next',
      keyboardType: 'default',
    },
  ]

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.firstBlock}>
          <Text style={styles.heading}>Profile Information</Text>
          <View style={styles.form}>
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

        <View style={styles.secondBlock}>
          <Text style={styles.heading}>Skills</Text>
          <View style={styles.form}>
            <View style={styles.skillContainer}>
              {skills && skills.length > 0 ? (
                <View style={styles.list}>
                  {skills.map((skill, index) => (
                    <ChipButton
                      key={index}
                      name={skill.name}
                      bgColor={Theme.palette.black.primary}
                      txtColor={Theme.palette.white.primary}
                      fsize={14}
                    />
                  ))}
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('TechnicalSkillsScreen')}
                >
                  <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Add new skill</Text>
                    <Ionicons name="add" size={24} color={Theme.palette.white.primary} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 15,
          width: '90%',
          marginHorizontal: 16,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstBlock: {
    flex: 1,
    backgroundColor: Theme.palette.white.primary,
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 16,
    padding: 8,
  },
  secondBlock: {
    flex: 1,
    backgroundColor: Theme.palette.white.primary,
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 56,
    padding: 8,
  },
  heading: {
    ...Theme.fonts.headline.h6,
    paddingHorizontal: 8,
  },
  form: {
    flex: 1,
    padding: 8,
  },
  skillContainer: {
    marginVertical: 4,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: Theme.palette.black.primary,
    ...Theme.shadow.depth1,
    borderRadius: 8,
    padding: 12,
    // marginVertical: 4,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    ...Theme.fonts.body.body1,
    color: Theme.palette.white.primary,
  },
})
