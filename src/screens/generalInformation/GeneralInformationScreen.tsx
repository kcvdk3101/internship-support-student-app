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
import { gender, phoneRegExp } from '../../constant'
import GeneralButton from '../../components/buttons/GeneralButton'
import VerticalSelectInput from '../../components/common/VerticalSelectInput'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

type GeneralInformationScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

type FieldProps = {
  fullName: string
  position: string
  email: string
  phone: number
  gender: string
  city: string
  address: string
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
]

const locationInformation = [
  {
    label: 'City',
    type: 'name',
    inputName: 'city',
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

const generalInformationSchema = yup.object({
  fullName: yup.string().required(),
  position: yup.string().required(),
  email: yup.string().email('Invalid email format').required('Required'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
})

const GeneralInformationScreen: React.FC<GeneralInformationScreenProps> = ({
  navigation,
}) => {
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
            marginHorizontal: 12,
            marginTop: 12,
            marginBottom: 16,
            padding: 8,
          }}
        >
          <Text
            style={{
              ...Theme.fonts.headline.h6,
              paddingHorizontal: 8,
            }}
          >
            Profile Information
          </Text>
          <View
            style={{
              flex: 1,
              padding: 8,
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
            <VerticalSelectInput
              label="Gender"
              type="name"
              inputName="selectedGender"
              placeHolderLabel="Select gender"
              items={gender}
              control={control}
              errors={errors}
            />
            {locationInformation.map((loc, index) => (
              <VerticalInput
                key={index}
                label={loc.label}
                type={loc.type}
                inputName={loc.inputName}
                placeholder={loc.placeholder}
                returnKeyType={loc.returnKeyType as ReturnKeyTypeOptions}
                keyboardType={loc.keyboardType as KeyboardTypeOptions}
                control={control}
                errors={errors}
              />
            ))}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: Theme.palette.white.primary,
            borderRadius: 8,
            marginHorizontal: 12,
            marginBottom: 56,
            padding: 8,
          }}
        >
          <Text
            style={{
              ...Theme.fonts.headline.h6,
              paddingHorizontal: 8,
            }}
          >
            Technical Skills
          </Text>
          <View
            style={{
              flex: 1,
              padding: 8,
            }}
          >
            <View>
              <Text>Skils</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: Theme.palette.black.primary,
                  ...Theme.shadow.depth1,
                  borderRadius: 8,
                  padding: 12,
                  marginVertical: 4,
                }}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('TechnicalSkillsScreen')}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      ...Theme.fonts.body.body1,
                      color: Theme.palette.white.primary,
                    }}
                  >
                    Add new
                  </Text>
                  <Ionicons
                    name="add"
                    size={24}
                    color={Theme.palette.white.primary}
                  />
                </View>
              </TouchableOpacity>
              {/* <GeneralButton
                isAlignCenter={true}
                bgColor={Theme.palette.black.primary}
                txtColor={Theme.palette.white.primary}
                label="Add New"
              /> */}
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
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

const styles = StyleSheet.create({})
