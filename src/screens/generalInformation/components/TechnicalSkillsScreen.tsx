import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import GeneralButton from '../../../components/buttons/GeneralButton'
import { screenHeight } from '../../../constant'
import Skills from '../../../constant/skills'
import { addListSkill } from '../../../features/cvSlice'
import { useAppDispatch } from '../../../hooks/redux'
import Theme from '../../../utils/Theme'

type TechnicalSkillsScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const TechnicalSkillsScreen: React.FC<TechnicalSkillsScreenProps> = ({ navigation }) => {
  const placeholder = {
    label: 'Select skill',
    value: '',
    color: Theme.palette.white.primary,
  }

  const dispatch = useAppDispatch()

  const [listSkills, setListSkills] = useState<object[]>([])
  const [total, setTotal] = useState<number>(1)
  const [skillsSelected, setSkillsSelected] = useState<string>('')

  let filterArray = Skills

  const handleOnChange = (data: string) => {
    setSkillsSelected(data)
  }

  const handleAddSkill = (data: string) => {
    setListSkills([...listSkills, { name: data }])
    let indexSkillSelected = filterArray.findIndex((skill) => skill.value === data)
    filterArray.splice(indexSkillSelected, 1)
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <Text
        style={{
          ...Theme.fonts.headline.h6,
          marginBottom: 8,
        }}
      >
        List of Skills
      </Text>
      {[...Array(total).keys()].map((item, index) => (
        <RNPickerSelect
          key={index}
          items={filterArray}
          onValueChange={handleOnChange}
          placeholder={placeholder}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={Platform.OS === 'ios' ? false : true}
          onDonePress={() => {
            setListSkills([...listSkills, { name: skillsSelected }])
            let indexSkillSelected = filterArray.findIndex(
              (skill) => skill.value === skillsSelected,
            )
            filterArray.splice(indexSkillSelected, 1)
          }}
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
        onPress={() => {
          setTotal(total + 1)
        }}
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
      <View
        style={{
          position: 'absolute',
          top: screenHeight * 0.8,
          width: '100%',
          marginHorizontal: 16,
        }}
      >
        <GeneralButton
          label="Done"
          bgColor={Theme.palette.main.primary}
          txtColor={Theme.palette.white.primary}
          isAlignCenter={true}
          onPress={() => {
            dispatch(addListSkill(listSkills))
            navigation.goBack()
          }}
          isLoading={false}
        />
      </View>
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
