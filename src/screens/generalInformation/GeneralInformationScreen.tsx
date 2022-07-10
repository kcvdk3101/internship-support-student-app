import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Alert,
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
import { saveCVId } from '../../features/cvSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import { StudentModel } from '../../models/student.model'
import { useTranslation } from 'react-i18next'

type GeneralInformationScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

type FieldProps = {
  lastName: string
  firstName: string
  position: string
  email: string
  phone: string
  content: string
}

const generalInformationSchema = yup.object({
  lastName: yup.string().required('This field is required'),
  firstName: yup.string().required('This field is required'),
  position: yup.string().required('This field is required'),
  email: yup.string().email('Invalid email format').required('This field is required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('This field is required'),
  content: yup.string().required('This field is required'),
})

const generalInformation = [
  {
    label: 'Last name',
    type: 'name',
    inputName: 'lastName',
    placeholder: 'Enter your last name',
    returnKeyType: 'next',
    keyboardType: 'default',
    multi: false,
  },
  {
    label: 'First name',
    type: 'name',
    inputName: 'firstName',
    placeholder: 'Enter your first name',
    returnKeyType: 'next',
    keyboardType: 'default',
    multi: false,
  },
  {
    label: 'Position to apply',
    type: 'name',
    inputName: 'position',
    placeholder: 'Enter the position to apply',
    returnKeyType: 'next',
    keyboardType: 'default',
    multi: false,
  },
  {
    label: 'Email',
    type: 'email',
    inputName: 'email',
    placeholder: '',
    returnKeyType: 'next',
    keyboardType: 'default',
    multi: false,
  },
  {
    label: 'Phone',
    type: 'number',
    inputName: 'phone',
    placeholder: '',
    returnKeyType: 'done',
    keyboardType: 'default',
    multi: false,
  },
]

const GeneralInformationScreen: React.FC<GeneralInformationScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { firstName, lastName, email, phoneNumber, studentId, student } = useAppSelector(
    (state) => state.auth.user,
  )
  const curCV = useAppSelector((state) => state.cv.curCV)
  const { birthDate, address } = student as StudentModel
  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldProps>({
    resolver: yupResolver(generalInformationSchema),
    defaultValues: {
      lastName,
      firstName,
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
      let skills = curCV.details.skills.map((s) => ({ ...s, rating: 4 }))
      let contacts = [
        {
          title: 'Phone Number',
          content: phoneNumber as string,
        },
        {
          title: 'Address',
          content: address as string,
        },
        {
          title: 'Birthday',
          content: birthDate as string,
        },
      ]

      const response = await cvApi.addNewCV(studentId, formData)
      if (response.data.length > 0) {
        dispatch(saveCVId(response.data[0].id))
        const responseSkill = await cvApi.addSkill(response.data[0].id, skills)
        const responseContact = await cvApi.addContact(response.data[0].id, contacts)

        if (responseSkill.data.length > 0 && responseContact.data.length > 0) {
          navigation.navigate('AdditionalInformationScreen')
        } else {
          navigation.navigate('CVForm')
        }
      }
    } catch (error) {
      Alert.alert('Something wrong !')
      navigation.navigate('CVForm')
    } finally {
      setloading(false)
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
          <Text style={styles.heading}>{t('Profile information')}</Text>
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
                multiline={info.multi}
              />
            ))}
          </KeyboardAvoidingView>
        </View>

        <View style={styles.block}>
          <Text style={styles.heading}>{t('Summary')}</Text>
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
              returnKeyType="previous"
              keyboardType="ascii-capable"
              multiline={true}
              editable={!loading}
              control={control}
              errors={errors}
            />
          </KeyboardAvoidingView>
        </View>

        <View style={styles.block}>
          <Text style={styles.heading}>{t('Skill')}</Text>
          <View style={styles.form}>
            <View style={styles.skillContainer}>
              {curCV.details.skills && curCV.details.skills.length > 0 ? (
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
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={loading ? () => {} : () => navigation.navigate('TechnicalSkillsScreen')}
                >
                  <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>{t('Add skill')}</Text>
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
