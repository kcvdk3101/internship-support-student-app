import { Alert, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Theme from '../../../utils/Theme'
import RNPickerSelect from 'react-native-picker-select'
import { TeacherModel } from '../../../models/teacher.model'
import studentApi from '../../../api/university/studentApi'
import { string } from 'yup'
import GeneralButton from '../../../components/buttons/GeneralButton'
import { useAppSelector } from '../../../hooks/redux'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

type RegisterTeacherFormProps = {
  handleCloseForm: (action: string) => void
}

const RegisterTeacherForm: React.FC<RegisterTeacherFormProps> = ({ handleCloseForm }) => {
  const user = useAppSelector((state) => state.auth.user)
  const placeholder = {
    label: 'Select teacher',
    value: '',
    color: Theme.palette.white.primary,
  }
  let filterTeachers: { label: string; value: string }[] = []
  const [teachers, setTeachers] = useState<TeacherModel[]>([])
  const [selectedTeacher, setSelectedTeacher] = useState<string>('')

  teachers.map((teacher) => {
    filterTeachers.push({ label: teacher.fullName, value: teacher.id })
  })

  const handleOnChange = (data: string) => {
    setSelectedTeacher(data)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const response = await studentApi.getAllTeacher()
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
      const response = await studentApi.registerTeacher([
        {
          studentId: user.studentId,
          teacherId: selectedTeacher,
        },
      ])
      if (response[0].register.isActive) {
        await AsyncStorageLib.setItem('@teacherId', selectedTeacher)
        Alert.alert(response[0].message)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Something wrong!')
    } finally {
      handleCloseForm('openRegisterForm')
    }
  }

  return (
    <View>
      <Text style={styles.heading}>Select teacher</Text>
      <RNPickerSelect
        items={filterTeachers}
        onValueChange={handleOnChange}
        placeholder={placeholder}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={Platform.OS === 'ios' ? false : true}
      />
      <View style={styles.button}>
        <GeneralButton
          label="Register"
          bgColor={Theme.palette.main.primary}
          txtColor={Theme.palette.white.primary}
          isAlignCenter={true}
          onPress={registerTeacher}
          isLoading={false}
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
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: Theme.palette.black.primary,
    borderRadius: 8,
    padding: 16,
    marginVertical: 4,
    color: Theme.palette.white.primary,
    ...Theme.fonts.body.body1,
  },
  inputAndroid: {
    backgroundColor: Theme.palette.black.primary,
    borderRadius: 8,
    padding: 16,
    marginVertical: 4,
    color: Theme.palette.white.primary,
    ...Theme.fonts.body.body1,
  },
})
