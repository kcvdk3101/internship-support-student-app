import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Platform, StyleSheet, Text, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import studentApi from '../../../api/university/studentApi'
import GeneralButton from '../../../components/buttons/GeneralButton'
import { useAppSelector } from '../../../hooks/redux'
import { TeacherModel } from '../../../models/teacher.model'
import Theme from '../../../utils/Theme'

type RegisterTeacherFormProps = {
  handleCloseForm: (
    action: 'openForm' | 'openRegisterForm' | 'openReportForm' | 'openSendEmailTeacher',
  ) => void
  handleOpenForm: (
    action: 'openForm' | 'openRegisterForm' | 'openReportForm' | 'openSendEmailTeacher',
  ) => void
  handeOpenOutlookMailModal: () => void
}

const RegisterTeacherForm: React.FC<RegisterTeacherFormProps> = ({
  handleCloseForm,
  handleOpenForm,
  handeOpenOutlookMailModal,
}) => {
  const { t } = useTranslation()
  const user = useAppSelector((state) => state.auth.user)
  const placeholder = {
    label: t('Select teacher'),
    value: '',
    color: Theme.palette.white.primary,
  }
  const date = new Date()
  let year = date.getFullYear()
  let filterTeachers: { label: string; value: string }[] = []

  const [loading, setLoading] = useState(false)
  const [teachers, setTeachers] = useState<TeacherModel[]>([])
  const [selectedTeacher, setSelectedTeacher] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  teachers.map((teacher) => {
    filterTeachers.push({ label: teacher.fullName, value: teacher.id })
  })

  const handleOnChange = (data: string) => {
    setSelectedTeacher(data)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const response = await studentApi.getAllTeacher(year)
        if (response.data.length > 0) {
          setTeachers(response.data)
        } else {
          setTeachers([])
        }
      } catch (error) {
        Alert.alert('Cannot load list teacher')
      }
    })()
    return () => {
      setTeachers([])
    }
  }, [])

  const registerTeacher = async () => {
    try {
      if (selectedTeacher === '') {
        setErrorMessage('This field is required')
      } else {
        setLoading(true)
        const response = await studentApi.registerTeacher([
          {
            studentId: user.studentId,
            teacherId: selectedTeacher,
          },
        ])
        if (response[0].register) {
          handleCloseForm('openRegisterForm')
          setTimeout(() => {
            setLoading(false)
            handeOpenOutlookMailModal()
          }, 500)
        } else {
          Alert.alert('Cannot register this teacher')
        }
      }
    } catch (error) {
      Alert.alert('Something wrong!')
    }
  }

  return (
    <View style={{ marginVertical: 8 }}>
      <Text style={styles.heading}>{t('Sign up for teacher')}</Text>
      <RNPickerSelect
        items={filterTeachers}
        onValueChange={handleOnChange}
        placeholder={placeholder}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={Platform.OS === 'ios' ? false : true}
        disabled={loading}
      />
      <Text style={styles.errorText}>{errorMessage}</Text>
      <View style={styles.button}>
        <GeneralButton
          label={t('Register')}
          bgColor={Theme.palette.main.primary}
          txtColor={Theme.palette.white.primary}
          isAlignCenter={true}
          onPress={registerTeacher}
          isLoading={loading}
        />
      </View>
    </View>
  )
}

export default RegisterTeacherForm

const styles = StyleSheet.create({
  heading: {
    ...Theme.fonts.headline.h6,
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    marginVertical: 4,
    ...Theme.fonts.body.body2,
    color: Theme.palette.red.error,
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: Theme.palette.black.primary,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    color: Theme.palette.white.primary,
    ...Theme.fonts.body.body1,
  },
  inputAndroid: {
    backgroundColor: Theme.palette.black.primary,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    color: Theme.palette.white.primary,
    ...Theme.fonts.body.body1,
  },
})
