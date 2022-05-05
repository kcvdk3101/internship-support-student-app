import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ReturnKeyTypeOptions,
  KeyboardTypeOptions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import React from 'react'
import VerticalSelectInput from '../../../components/common/VerticalSelectInput'
import Theme from '../../../utils/Theme'
import VerticalInput from '../../../components/common/VerticalInput'
import { useForm } from 'react-hook-form'
import { screenWidth } from '../../../constant'

type ProjectScreenProps = {}

type FieldProps = {
  fullName: string
  position: string
  email: string
  phone: number
  gender: string
  city: string
  address: string
}

const projectInformation = [
  {
    label: 'Project Name',
    type: 'name',
    inputName: 'projectName',
    placeholder: '',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Start Time',
    type: 'name',
    inputName: 'startTime',
    placeholder: '',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'End Time',
    type: 'name',
    inputName: 'endTime',
    placeholder: '',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Team zone',
    type: 'number',
    inputName: 'teamZone',
    placeholder: '',
    returnKeyType: 'next',
    keyboardType: 'default',
  },
  {
    label: 'Responsibility',
    type: 'name',
    inputName: 'responsibility',
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
    returnKeyType: 'next',
    keyboardType: 'default',
    multiline: true,
  },
]

const ProjectScreen: React.FC<ProjectScreenProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldProps>()

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.firstBlock}>
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
                multiline={p.multiline}
                control={control}
                errors={errors}
              />
            ))}
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
