import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import GeneralButton from '../../../components/buttons/GeneralButton'
import Languages from '../../../constant/languages'
import { addListLanguage } from '../../../features/cvSlice'
import { useAppDispatch } from '../../../hooks/redux'
import Theme from '../../../utils/Theme'

type LanguagesScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const LanguagesScreen: React.FC<LanguagesScreenProps> = ({ navigation }) => {
  const placeholder = {
    label: 'Select language',
    value: '',
    color: Theme.palette.white.primary,
  }

  const dispatch = useAppDispatch()

  const [listLanguages, setListLanguages] = useState<string[]>([])
  const [total, setTotal] = useState<number>(1)
  const [languagesSelected, setLanguagesSelected] = useState<string | undefined>('')
  const [error, setError] = useState('')

  let filterArray = Languages

  const handleOnChange = (data: string) => {
    setLanguagesSelected(data)
  }

  const handleAddSkill = (data: string | undefined) => {
    setListLanguages([...listLanguages, data as string])
    let indexSkillSelected = filterArray.findIndex((skill) => skill.value === data)
    filterArray.splice(indexSkillSelected, 1)
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
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        List of Languages
      </Text>
      {[...Array(total).keys()].map((item, index) => (
        <View
          key={index}
          style={{
            marginVertical: 8,
          }}
        >
          <RNPickerSelect
            key={index}
            items={filterArray}
            onValueChange={handleOnChange}
            placeholder={placeholder}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={Platform.OS === 'ios' ? false : true}
          />
          {!languagesSelected && (
            <Text
              style={{
                marginVertical: 4,
                color: Theme.palette.red.error,
              }}
            >
              {error}
            </Text>
          )}
        </View>
      ))}
      <TouchableOpacity
        style={{
          backgroundColor: 'transparent',
          ...Theme.shadow.depth1,
          borderRadius: 8,
          padding: 12,
          marginVertical: 2,
        }}
        activeOpacity={0.8}
        onPress={() => {
          if (languagesSelected === '') {
            setError('Please choose language before add new')
          } else {
            setError('')
            setTotal(total + 1)
            handleAddSkill(languagesSelected)
          }
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
          bottom: 0,
          width: '95%',
          marginHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <GeneralButton
          label="Done"
          bgColor={Theme.palette.main.primary}
          txtColor={Theme.palette.white.primary}
          isAlignCenter={true}
          onPress={() => {
            if (languagesSelected !== '') {
              setListLanguages([...listLanguages, languagesSelected as string])
              setLanguagesSelected(undefined)
            }
            if (languagesSelected === undefined) {
              dispatch(addListLanguage(listLanguages))
              navigation.goBack()
            }
          }}
        />
      </View>
    </View>
  )
}

export default LanguagesScreen

const styles = StyleSheet.create({})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: Theme.palette.black.primary,
    borderRadius: 8,
    padding: 16,
    // marginVertical: 4,
    color: Theme.palette.white.primary,
    ...Theme.fonts.body.body1,
  },
  inputAndroid: {
    backgroundColor: Theme.palette.black.primary,
    borderRadius: 8,
    padding: 16,
    // marginVertical: 4,
    color: Theme.palette.white.primary,
    ...Theme.fonts.body.body1,
  },
})
