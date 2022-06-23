import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  ReturnKeyTypeOptions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as yup from 'yup'
import cvApi from '../../api/university/cvApi'
import ChipButton from '../../components/buttons/ChipButton'
import GeneralButton from '../../components/buttons/GeneralButton'
import VerticalInput from '../../components/common/VerticalInput'
import { phoneRegExp } from '../../constant'
import { useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'

type GeneralInformationScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

type FieldProps = {
  firstName: string
  lastName: string
  position: string
  email: string
  phone: string
  content: string
}

const generalInformationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  position: yup.string().required(),
  email: yup.string().email('Invalid email format').required(),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
  content: yup.string().required(),
})

const generalInformation = [
  {
    label: 'First Name',
    type: 'name',
    inputName: 'firstName',
    placeholder: 'Enter your first name',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Last Name',
    type: 'name',
    inputName: 'lastName',
    placeholder: 'Enter your last name',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Position to Apply',
    type: 'name',
    inputName: 'position',
    placeholder: 'Enter position',
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
    returnKeyType: 'done',
    keyboardType: 'default',
  },
]

const GeneralInformationScreen: React.FC<GeneralInformationScreenProps> = ({ navigation }) => {
  const { firstName, lastName, email, phoneNumber, studentId } = useAppSelector(
    (state) => state.auth.user,
  )
  const curCV = useAppSelector((state) => state.cv.curCV)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldProps>({
    resolver: yupResolver(generalInformationSchema),
    defaultValues: {
      firstName,
      lastName,
      email,
      phone: phoneNumber,
    },
  })

  const [loading, setloading] = useState(false)

  const onSubmit = async (data: FieldProps) => {
    setloading(true)

    let formData = new FormData()
    formData.append('files', JSON.stringify({ files: curCV.images }))
    formData.append('studentName', `${data.lastName} ${data.firstName}`)
    formData.append('position', data.position)
    formData.append('content', data.content)
    formData.append('name', curCV.name)

    try {
      const response = await cvApi.addNewCV(studentId, formData)
      // cv id is here
      console.log(response)
      navigation.navigate('AdditionalInformationScreen')
    } catch (error) {
      console.log('error ne', error)
    } finally {
      setloading(false)
      navigation.navigate('AdditionalInformationScreen')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={[
            styles.block,
            {
              marginTop: 12,
            },
          ]}
        >
          <Text style={styles.heading}>Profile Information</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.form}
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
                editable={!loading}
              />
            ))}
          </KeyboardAvoidingView>
        </View>

        <View style={styles.block}>
          <Text style={styles.heading}>Summary</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.form}
          >
            <VerticalInput
              label="Content"
              type="name"
              inputName="content"
              placeholder="Write something about yourself"
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="ascii-capable"
              multiline={true}
              editable={!loading}
              control={control}
              errors={errors}
            />
          </KeyboardAvoidingView>
        </View>

        <View style={styles.block}>
          <Text style={styles.heading}>Skills</Text>
          <View style={styles.form}>
            <View style={styles.skillContainer}>
              {curCV.details.skills && curCV.details.skills.length > 0 ? (
                <View>
                  <View style={styles.list}>
                    {curCV.details.skills.map((skill, index) => (
                      <ChipButton
                        key={index}
                        name={skill.name}
                        bgColor={Theme.palette.black.primary}
                        txtColor={Theme.palette.white.primary}
                        fsize={14}
                      />
                    ))}
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={
                      loading ? () => {} : () => navigation.navigate('TechnicalSkillsScreen')
                    }
                  >
                    <View style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>Add skill</Text>
                      <Ionicons name="add" size={24} color={Theme.palette.white.primary} />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={loading ? () => {} : () => navigation.navigate('TechnicalSkillsScreen')}
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
      <View style={{ marginHorizontal: 32, marginBottom: 36 }}>
        <GeneralButton
          label="Finish to continue"
          bgColor={Theme.palette.main.primary}
          txtColor={Theme.palette.white.primary}
          isAlignCenter={true}
          onPress={handleSubmit(onSubmit)}
          isLoading={loading}
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
  block: {
    flex: 1,
    backgroundColor: Theme.palette.white.primary,
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 16,
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
