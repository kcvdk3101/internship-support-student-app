import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  ReturnKeyTypeOptions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import GeneralButton from '../../../components/buttons/GeneralButton'
import VerticalInput from '../../../components/common/VerticalInput'
import { addCertification } from '../../../features/cvSlice'
import { useAppDispatch } from '../../../hooks/redux'
import Theme from '../../../utils/Theme'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type CertificationScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

type FieldProps = {
  name: string
  issueDate: string
  organizer: string
}

const certificationInformation = [
  {
    label: 'Certification Name',
    type: 'name',
    inputName: 'name',
    placeholder: '',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Issue Date',
    type: 'number',
    inputName: 'issueDate',
    placeholder: '',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Organization',
    type: 'name',
    inputName: 'organizer',
    placeholder: '',
    returnKeyType: 'done',
    keyboardType: 'default',
  },
]

const certiSchema = yup.object({
  name: yup.string().required(),
  issueDate: yup.string().required(),
  organizer: yup.string().required(),
})

const CertificationScreen: React.FC<CertificationScreenProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldProps>({
    mode: 'onChange',
    resolver: yupResolver(certiSchema),
    defaultValues: {
      name: 'TOEIC',
      issueDate: '2022-07-22',
      organizer: 'IIG VietNam',
    },
  })
  const dispatch = useAppDispatch()

  const onSubmit = (data: FieldProps) => {
    dispatch(addCertification(data))
    navigation.goBack()
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      enabled
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.firstBlock}>
          <View style={styles.form}>
            {certificationInformation.map((certi, index) => (
              <VerticalInput
                key={index}
                label={certi.label}
                type={certi.type}
                inputName={certi.inputName}
                placeholder={certi.placeholder}
                autoCapitalize="none"
                returnKeyType={certi.returnKeyType as ReturnKeyTypeOptions}
                keyboardType={certi.keyboardType as KeyboardTypeOptions}
                control={control}
                errors={errors}
                editable={true}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          marginVertical: 32,
          marginHorizontal: 16,
        }}
      >
        <GeneralButton
          label="Done"
          bgColor={Theme.palette.main.primary}
          txtColor={Theme.palette.white.primary}
          isAlignCenter={true}
          onPress={handleSubmit(onSubmit)}
          isLoading={false}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default CertificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 8,
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
    marginVertical: 4,
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
