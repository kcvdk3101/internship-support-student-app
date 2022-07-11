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
import { addProject } from '../../../features/cvSlice'
import { useAppDispatch } from '../../../hooks/redux'
import Theme from '../../../utils/Theme'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'

type ProjectScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

type FieldProps = {
  projectName: string
  startDate: string
  endDate: string
  teamSize: number
  role: string
  responsibilities: string
  sourceLink: string
  description: string
}

const projectSchema = yup.object({
  projectName: yup.string().required('This field is required'),
  startDate: yup.string().required('This field is required'),
  endDate: yup.string().required('This field is required'),
  teamSize: yup
    .number()
    .typeError('This field must be a number')
    .integer()
    .required('This field is required'),
  role: yup.string().required('This field is required'),
  responsibilities: yup.string().required('This field is required'),
  sourceLink: yup.string().required('This field is required'),
  description: yup.string().required('This field is required'),
})

const projectInformation = [
  {
    label: 'Project name',
    type: 'name',
    inputName: 'projectName',
    placeholder: '',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Start date',
    type: 'name',
    inputName: 'startDate',
    placeholder: 'dd/mm/yyyy',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'End date',
    type: 'name',
    inputName: 'endDate',
    placeholder: 'dd/mm/yyyy',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Team size',
    type: 'number',
    inputName: 'teamSize',
    placeholder: '',
    returnKeyType: 'next',
    keyboardType: 'number-pad',
  },
  {
    label: 'Role',
    type: 'name',
    inputName: 'role',
    placeholder: '',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Responsibility',
    type: 'name',
    inputName: 'responsibilities',
    placeholder: '',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Source link',
    type: 'name',
    inputName: 'sourceLink',
    placeholder: '',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Description',
    type: 'name',
    inputName: 'description',
    placeholder: '',
    multiline: true,
    returnKeyType: 'done',
    keyboardType: 'default',
  },
]

const ProjectScreen: React.FC<ProjectScreenProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldProps>({
    mode: 'onChange',
    resolver: yupResolver(projectSchema),
    defaultValues: {
      projectName: 'project',
      startDate: '21/04/2022',
      endDate: '20/04/2023',
      teamSize: 4,
      role: 'Frontend',
      responsibilities: 'Response to build backend server in e-commercial application',
      sourceLink: 'https://github.com/kcvdk3101',
      description: 'Senior Project',
    },
  })
  const dispatch = useAppDispatch()

  const onSubmit = (data: FieldProps) => {
    dispatch(addProject(data))
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
        <View style={styles.block}>
          <View style={styles.form}>
            {projectInformation.map((p, index) => (
              <VerticalInput
                key={index}
                label={p.label}
                type={p.type}
                inputName={p.inputName}
                placeholder={p.placeholder}
                autoCapitalize="none"
                returnKeyType={p.returnKeyType as ReturnKeyTypeOptions}
                keyboardType={p.keyboardType as KeyboardTypeOptions}
                control={control}
                errors={errors}
                editable={true}
                multiline={p.multiline}
              />
            ))}
          </View>
          <View
            style={{
              marginBottom: 16,
            }}
          >
            <GeneralButton
              label={t('Done')}
              bgColor={Theme.palette.main.primary}
              txtColor={Theme.palette.white.primary}
              isAlignCenter={true}
              onPress={handleSubmit(onSubmit)}
              isLoading={false}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ProjectScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 8,
  },
  block: {
    flex: 1,
    backgroundColor: Theme.palette.white.primary,
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 16,
    padding: 8,
    marginTop: 12,
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
