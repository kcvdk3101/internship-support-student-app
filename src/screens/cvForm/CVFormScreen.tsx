import { yupResolver } from '@hookform/resolvers/yup'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ParamListBase } from '@react-navigation/native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import * as yup from 'yup'
import GeneralButton from '../../components/buttons/GeneralButton'
import VerticalInput from '../../components/common/VerticalInput'
import VerticalSelectInput from '../../components/common/VerticalSelectInput'
import { languages } from '../../constant'
import { addCVName } from '../../features/cvSlice'
import { useAppDispatch } from '../../hooks/redux'
import Theme from '../../utils/Theme'

type CVFormScreenProps = {
  navigation: DrawerNavigationProp<ParamListBase>
}

type FieldProps = {
  cvName: string
  selectedLanguage: string
}

const cvFormSchema = yup.object({
  cvName: yup.string().required(),
  selectedLanguage: yup.string().required(),
})

const CVFormScreen: React.FC<CVFormScreenProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldProps>({
    defaultValues: {
      cvName: '',
      selectedLanguage: '',
    },
    resolver: yupResolver(cvFormSchema),
  })
  const dispatch = useAppDispatch()

  const onSubmit = async (data: FieldProps) => {
    if (data.cvName === '' || data.selectedLanguage === '') return

    try {
      dispatch(addCVName(data.cvName))
      navigation.navigate('GeneralInformationScreen')
    } catch (error) {
      console.log(error)
      navigation.navigate('CVScreen')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innnerContainer}>
        <View>
          <Text style={styles.introductHeading}>Start create CV on FITSI</Text>
          <Text style={styles.introductContent}>
            Create a CV quickly and free, exclusively for all students. Make your career more
            interesting with FITSI from today.
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.form}
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
              editable={!isSubmitting}
            />
            <VerticalSelectInput
              label="Language"
              type="name"
              inputName="selectedLanguage"
              placeHolderLabel="Select language"
              items={languages}
              control={control}
              errors={errors}
            />
          </KeyboardAvoidingView>
        </View>

        <View>
          <GeneralButton
            label="Start Making CV"
            bgColor={Theme.palette.main.primary}
            txtColor={Theme.palette.white.primary}
            isAlignCenter={true}
            isLoading={false}
            onPress={handleSubmit(onSubmit)}
          />
          <View style={{ height: 10 }} />
          <GeneralButton
            label="Cancel"
            bgColor={Theme.palette.paragraph.primary}
            txtColor={Theme.palette.black.primary}
            isAlignCenter={true}
            isLoading={false}
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
    borderRadius: 20,
    backgroundColor: Theme.palette.white.primary,
    ...Theme.shadow.depth2,
    padding: 20,
    margin: 8,
  },
  introductHeading: {
    ...Theme.fonts.headline.h6,
  },
  introductContent: {
    marginTop: 4,
    ...Theme.fonts.body.body2,
  },
  form: {
    marginTop: 8,
  },
})
