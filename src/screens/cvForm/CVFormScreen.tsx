import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useState } from 'react'
import GeneralButton from '../../components/buttons/GeneralButton'
import Theme from '../../utils/Theme'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ParamListBase } from '@react-navigation/native'
import VerticalInput from '../../components/common/VerticalInput'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import VerticalSelectInput from '../../components/common/VerticalSelectInput'
import { languages } from '../../constant'

type CVFormScreenProps = {
  navigation: DrawerNavigationProp<ParamListBase>
}

type FieldProps = {
  cvName: string
}

const cvFormSchema = yup.object({
  cvName: yup.string().required('Name is required'),
})

const CVFormScreen: React.FC<CVFormScreenProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldProps>({
    defaultValues: {
      cvName: '',
    },
    resolver: yupResolver(cvFormSchema),
  })

  const [selectedLanguage, setSelectedLanguage] = useState<string>('')

  const handleSelectedLanguage = (value: string) => {
    setSelectedLanguage(value)
  }

  const onSubmit = (data: FieldProps) => {
    console.log(data)
    navigation.navigate('GeneralInformationScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.innnerContainer}>
        <View>
          <Text
            style={{
              ...Theme.fonts.headline.h6,
            }}
          >
            Start create CV on FITSI
          </Text>
          <Text
            style={{
              marginTop: 4,
              ...Theme.fonts.body.body2,
            }}
          >
            Create a CV quickly and free, exclusively for all students. Make
            your career more interesting with FITSI from today.
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              marginTop: 8,
            }}
          >
            <VerticalInput
              label="CV Name"
              type="name"
              inputName="cvName"
              placeholder="Name"
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="ascii-capable"
              control={control}
              errors={errors}
            />
            <VerticalSelectInput
              label="Language"
              type="name"
              inputName="language"
              placeHolderLabel="Select language..."
              items={languages}
              selectedLanguage={selectedLanguage}
              handleSelectedLanguage={handleSelectedLanguage}
              control={control}
            />
          </KeyboardAvoidingView>
        </View>

        <View>
          <GeneralButton
            label="Start Making CV"
            bgColor={Theme.palette.main.primary}
            txtColor={Theme.palette.white.primary}
            isAlignCenter={true}
            onPress={handleSubmit(onSubmit)}
          />
          <View style={{ height: 10 }} />
          <GeneralButton
            label="Cancel"
            bgColor={Theme.palette.paragraph.primary}
            txtColor={Theme.palette.black.primary}
            isAlignCenter={true}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  )
}

export default CVFormScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  innnerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: Theme.palette.white.primary,
    ...Theme.shadow.depth2,
    padding: 16,
  },
  introductContainer: {},
})
