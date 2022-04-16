import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import VerticalSelectInput from '../../../components/common/VerticalSelectInput'
import Theme from '../../../utils/Theme'
import VerticalInput from '../../../components/common/VerticalInput'
import { useForm } from 'react-hook-form'
import VerticalDateTimePicker from '../../../components/common/VerticalDateTimePicker'

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

const ProjectScreen: React.FC<ProjectScreenProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldProps>()

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.firstBlock}>
          <View style={styles.form}>
            <VerticalInput
              label="Project Name"
              type="name"
              inputName="projectName"
              placeholder="Project name"
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="ascii-capable"
              control={control}
              errors={errors}
            />
            <VerticalDateTimePicker />
          </View>
        </View>
      </ScrollView>
    </View>
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
