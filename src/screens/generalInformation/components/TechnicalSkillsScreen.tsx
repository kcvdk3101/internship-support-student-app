import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Theme from '../../../utils/Theme'
import VerticalSelectInput from '../../../components/common/VerticalSelectInput'
import Skills from '../../../constant/skills'
import { useForm } from 'react-hook-form'
import GeneralButton from '../../../components/buttons/GeneralButton'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select'

type TechnicalSkillsScreenProps = {}

type FieldProps = {
  skill: string
}

const TechnicalSkillsScreen: React.FC<TechnicalSkillsScreenProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldProps>()

  let arr = []

  const [listSkills, setListSkills] = useState([])
  const [total, setTotal] = useState(1)

  const [skillsSelected, setSkillsSelected] = useState('')

  const handleAddSkill = (data: any) => {
    arr.push(data)
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 8,
      }}
    >
      <Text
        style={{
          ...Theme.fonts.headline.h6,
        }}
      >
        List of Skills
      </Text>
      {/* <VerticalSelectInput
        // label="Gender"
        type="name"
        inputName="selectedSkills"
        placeHolderLabel="Select skills"
        items={Skills}
        control={control}
        errors={errors}
      /> */}
      {[...Array(total).keys()].map((item, index) => (
        <RNPickerSelect
          key={index}
          items={Skills}
          onValueChange={handleAddSkill}
          // placeholder={placeholder}
          style={pickerSelectStyles}
          // value={Skill}
          useNativeAndroidPickerStyle={Platform.OS === 'ios' ? false : true}
        />
      ))}
      <TouchableOpacity
        style={{
          backgroundColor: 'transparent',
          ...Theme.shadow.depth1,
          borderRadius: 8,
          padding: 12,
          marginVertical: 4,
        }}
        activeOpacity={0.8}
        onPress={() => setTotal(total + 1)}
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
              color: Theme.palette.main.primary,
            }}
          >
            Add new
          </Text>
          <Ionicons name="add" size={24} color={Theme.palette.main.primary} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default TechnicalSkillsScreen

const styles = StyleSheet.create({})

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
