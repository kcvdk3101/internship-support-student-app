import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  const placeholder = {
    label: t('Select skill'),
    value: '',
    color: Theme.palette.white.primary,
  }

  const dispatch = useAppDispatch()

  const [listSkills, setListSkills] = useState<object[]>([])
  const [total, setTotal] = useState<number>(1)
  const [skillsSelected, setSkillsSelected] = useState<string>('')

  // let filterArray = Skills
  const [filterArray, setFilterArray] = useState(Skills)

  const handleOnChange = (data: string) => {
    setSkillsSelected(data)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('List of Skills')}</Text>
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
            setFilterArray(filterArray)
          }}
        />
      ))}
      <TouchableOpacity
        style={styles.buttonAddContainer}
        activeOpacity={0.8}
        onPress={() => {
          setTotal(total + 1)
        }}
      >
        <View style={styles.buttonAddInnerContainer}>
          <Text style={styles.buttonAddText}>{t('Add skill')}</Text>
          <Ionicons name="add" size={24} color={Theme.palette.main.primary} />
        </View>
      </TouchableOpacity>
      <View style={styles.buttonDone}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    ...Theme.fonts.headline.h6,
    marginBottom: 8,
  },
  buttonAddContainer: {
    backgroundColor: 'transparent',
    ...Theme.shadow.depth1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
  },
  buttonAddInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAddText: {
    textAlign: 'center',
    ...Theme.fonts.body.body1,
    color: Theme.palette.main.primary,
  },
  buttonDone: {
    position: 'absolute',
    top: screenHeight * 0.8,
    width: '100%',
    marginHorizontal: 16,
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
